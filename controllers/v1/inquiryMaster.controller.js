import InquiryMaster from "../../models/InquiryMaster.js";
import EmailSetup from "../../models/EmailSetup.js";
import nodemailer from "nodemailer";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ isOk: false, message: "Required fields missing" });
    }

    const newInquiry = new InquiryMaster({
      name,
      email,
      message,
    });

    await newInquiry.save();

    // Attempt to send auto-acknowledgement email
    try {
      const emailSetup = await EmailSetup.findOne({ isActive: true });
      if (emailSetup) {
        let transporter;
        if (emailSetup.host.toLowerCase().includes("gmail")) {
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailSetup.email,
              pass: emailSetup.appPassword,
            },
          });
        } else {
          transporter = nodemailer.createTransport({
            host: emailSetup.host,
            port: emailSetup.port,
            secure: emailSetup.SSL,
            auth: {
              user: emailSetup.email,
              pass: emailSetup.appPassword,
            },
          });
        }

        const mailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea;">
            <h2 style="font-weight: 600; letter-spacing: -0.02em; color: #111;">INQUIRY ACKNOWLEDGED</h2>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Hello ${name},
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Your message has been successfully logged into our portfolio telemetry database.
            </p>
            <blockquote style="border-left: 2px solid #111; margin: 20px 0; padding-left: 15px; color: #333; font-style: italic;">
              "${message}"
            </blockquote>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              I will establish connection shortly.
            </p>
            <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 25px 0;" />
            <p style="color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">
              © 2026 PHARSH9 SYSTEMS. ALL CHANNELS MONITORED.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"pHarsh9 Systems" <${emailSetup.email}>`,
          to: email,
          subject: "Transmission Received — pHarsh9 Portfolio",
          html: mailHtml,
        });
        console.log(`Auto-acknowledgement email sent to ${email}`);
      } else {
        console.log("No active EmailSetup found for auto-acknowledgement.");
      }
    } catch (emailError) {
      console.error("Error sending auto-acknowledgement email:", emailError);
      // We don't fail the request if email fails, so the visitor still gets their inquiry logged!
    }

    res.status(201).json({ isOk: true, data: newInquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listAllInquiries = async (req, res) => {
  try {
    const inquiries = await InquiryMaster.find({});
    res.status(200).json({ isOk: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { inquiryId } = req.params;

    const inquiry = await InquiryMaster.findByIdAndDelete(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ isOk: false, message: "Inquiry not found" });
    }

    res.status(200).json({ isOk: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listInquiriesByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match } = req.body;

    let query = [
      {
        $facet: {
          stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
          stage2: [{ $skip: skip || 0 }, { $limit: per_page || 10 }],
        },
      },
      { $unwind: { path: "$stage1", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          count: { $ifNull: ["$stage1.count", 0] },
          data: "$stage2",
        },
      },
    ];

    if (match) {
      query = [
        {
          $match: {
            $or: [
              { name: { $regex: match, $options: "i" } },
              { email: { $regex: match, $options: "i" } },
              { message: { $regex: match, $options: "i" } },
            ],
          },
        },
      ].concat(query);
    }

    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir === "desc" ? -1 : 1;
      query = [{ $sort: sort }].concat(query);
    } else {
      query = [{ $sort: { createdAt: -1 } }].concat(query);
    }

    const list = await InquiryMaster.aggregate(query);
    res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error in listInquiriesByParams:", error);
    res.status(500).json({ isOk: false, message: error.message });
  }
};
