import SkillMaster from "../../models/SkillMaster.js";

export const createSkill = async (req, res) => {
  try {
    const { category, skills, isActive } = req.body;

    if (!category || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ isOk: false, message: "Required fields missing" });
    }

    const newSkill = new SkillMaster({
      category,
      skills,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newSkill.save();
    res.status(201).json({ isOk: true, data: newSkill });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listAllSkills = async (req, res) => {
  try {
    const skills = await SkillMaster.find({ isActive: true });
    res.status(200).json({ isOk: true, data: skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const updateData = req.body;

    const updatedSkill = await SkillMaster.findByIdAndUpdate(
      skillId,
      updateData,
      { new: true },
    );

    if (!updatedSkill) {
      return res.status(404).json({ isOk: false, message: "Skill not found" });
    }

    res.status(200).json({ isOk: true, data: updatedSkill });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const skill = await SkillMaster.findByIdAndDelete(skillId);
    if (!skill) {
      return res.status(404).json({ isOk: false, message: "Skill not found" });
    }

    res.status(200).json({ isOk: true, message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await SkillMaster.findById(skillId);
    if (!skill) {
      return res.status(404).json({ isOk: false, message: "Skill not found" });
    }
    res.status(200).json({ isOk: true, data: skill });
  } catch (error) {
    console.error("Error fetching skill:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listSkillsByParams = async (req, res) => {
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
              { category: { $regex: match, $options: "i" } },
              { skills: { $regex: match, $options: "i" } },
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

    const list = await SkillMaster.aggregate(query);
    res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error in listSkillsByParams:", error);
    res.status(500).json({ isOk: false, message: error.message });
  }
};
