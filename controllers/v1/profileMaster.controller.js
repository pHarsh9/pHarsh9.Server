import ProfileMaster from "../../models/ProfileMaster.js";

export const getProfile = async (req, res) => {
  try {
    let profile = await ProfileMaster.findOne({ isActive: true });
    if (!profile) {
      // Create a default if none exists to avoid failures
      profile = await ProfileMaster.create({
        socialLinks: [
          { platform: "LinkedIn", url: "https://linkedin.com" },
          { platform: "Instagram", url: "https://instagram.com" },
          { platform: "GitHub", url: "https://github.com/pHarsh9" }
        ]
      });
    }
    return res.status(200).json({ isOk: true, data: profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await ProfileMaster.findOneAndUpdate(
      { isActive: true },
      req.body,
      { new: true, upsert: true }
    );
    return res.status(200).json({ isOk: true, data: updated });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};
