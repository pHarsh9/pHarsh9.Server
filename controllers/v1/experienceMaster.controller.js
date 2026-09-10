import ExperienceMaster from "../../models/ExperienceMaster.js";

export const createExperience = async (req, res) => {
  try {
    const { company, role, period, description, bulletPoints, isActive } = req.body;

    if (!company || !role || !period || !description) {
      return res.status(400).json({ isOk: false, message: "Required fields missing" });
    }

    const newExperience = new ExperienceMaster({
      company,
      role,
      period,
      description,
      bulletPoints: bulletPoints || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    await newExperience.save();
    res.status(201).json({ isOk: true, data: newExperience });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listAllExperiences = async (req, res) => {
  try {
    const experiences = await ExperienceMaster.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ isOk: true, data: experiences });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const updateData = req.body;

    const updatedExperience = await ExperienceMaster.findByIdAndUpdate(
      experienceId,
      updateData,
      { new: true },
    );

    if (!updatedExperience) {
      return res.status(404).json({ isOk: false, message: "Experience not found" });
    }

    res.status(200).json({ isOk: true, data: updatedExperience });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const experience = await ExperienceMaster.findByIdAndDelete(experienceId);
    if (!experience) {
      return res.status(404).json({ isOk: false, message: "Experience not found" });
    }

    res.status(200).json({ isOk: true, message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const experience = await ExperienceMaster.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ isOk: false, message: "Experience not found" });
    }
    res.status(200).json({ isOk: true, data: experience });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listExperiencesByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, isActive } = req.body;

    let matchCondition = {};
    if (isActive !== undefined && isActive !== null && isActive !== "") {
      matchCondition.isActive = isActive;
    }

    let query = [
      { $match: matchCondition },
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
              { company: { $regex: match, $options: "i" } },
              { role: { $regex: match, $options: "i" } },
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

    const list = await ExperienceMaster.aggregate(query);
    res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error in listExperiencesByParams:", error);
    res.status(500).json({ isOk: false, message: error.message });
  }
};
