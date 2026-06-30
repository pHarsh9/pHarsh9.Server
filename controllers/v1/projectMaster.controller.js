import ProjectMaster from "../../models/ProjectMaster.js";

export const createProject = async (req, res) => {
  try {
    const {
      slug,
      projectNumber,
      category,
      title,
      subtitle,
      specs,
      summary,
      figTitle,
      figCaption,
      diagramImage,
      abstractHeader,
      abstractBody,
      codeBlock,
      metrics,
      bottomImage,
      bottomText,
      isActive,
    } = req.body;

    if (!slug || !title || !summary) {
      return res.status(400).json({ isOk: false, message: "Required fields missing" });
    }

    const newProject = new ProjectMaster({
      slug,
      projectNumber,
      category,
      title,
      subtitle,
      specs,
      summary,
      figTitle,
      figCaption,
      diagramImage,
      abstractHeader,
      abstractBody,
      codeBlock,
      metrics,
      bottomImage,
      bottomText,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newProject.save();
    res.status(201).json({ isOk: true, data: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listAllProjects = async (req, res) => {
  try {
    const projects = await ProjectMaster.find({ isActive: true });
    res.status(200).json({ isOk: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;

    const updatedProject = await ProjectMaster.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true },
    );

    if (!updatedProject) {
      return res.status(404).json({ isOk: false, message: "Project not found" });
    }

    res.status(200).json({ isOk: true, data: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await ProjectMaster.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ isOk: false, message: "Project not found" });
    }

    res.status(200).json({ isOk: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await ProjectMaster.findById(projectId);
    if (!project) {
      return res.status(404).json({ isOk: false, message: "Project not found" });
    }
    res.status(200).json({ isOk: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await ProjectMaster.findOne({ slug, isActive: true });
    if (!project) {
      return res.status(404).json({ isOk: false, message: "Project not found" });
    }
    res.status(200).json({ isOk: true, data: project });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    res.status(500).json({ isOk: false, message: "Internal server error" });
  }
};

export const listProjectsByParams = async (req, res) => {
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
              { title: { $regex: match, $options: "i" } },
              { category: { $regex: match, $options: "i" } },
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

    const list = await ProjectMaster.aggregate(query);
    res.status(200).json({ isOk: true, data: list, status: 200 });
  } catch (error) {
    console.error("Error in listProjectsByParams:", error);
    res.status(500).json({ isOk: false, message: error.message });
  }
};
