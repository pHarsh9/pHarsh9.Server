import mongoose from "mongoose";

const localURI = "mongodb://localhost:27017/pentagon";
const atlasURI = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/portfolios?retryWrites=true&w=majority&appName=Cluster0";

const insertMenus = async (dbURI, label) => {
  try {
    const conn = await mongoose.createConnection(dbURI).asPromise();
    console.log(`Connected to ${label}`);

    const groupCol = conn.db.collection("menugroupmasters");
    const menuCol = conn.db.collection("menumasters");

    // Check if Portfolio Management group already exists
    let group = await groupCol.findOne({ menuGroupName: "Portfolio Management" });
    if (!group) {
      const result = await groupCol.insertOne({
        menuGroupName: "Portfolio Management",
        sequence: 10,
        isActive: true,
        isLink: false,
        menuUrl: "#",
        icon: "RiProfileLine",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      group = { _id: result.insertedId };
      console.log(`  Created 'Portfolio Management' group in ${label}.`);
    } else {
      console.log(`  'Portfolio Management' group already exists in ${label}.`);
    }

    const menusToInsert = [
      { menuName: "Project Master", menuUrl: "/project-master", sequence: 1 },
      { menuName: "Experience Master", menuUrl: "/experience-master", sequence: 2 },
      { menuName: "Skill Master", menuUrl: "/skill-master", sequence: 3 },
      { menuName: "Inquiry Logs", menuUrl: "/inquiry-logs", sequence: 4 },
    ];

    for (const m of menusToInsert) {
      const existingMenu = await menuCol.findOne({ menuName: m.menuName, menuGroup: group._id });
      if (!existingMenu) {
        await menuCol.insertOne({
          menuName: m.menuName,
          menuGroup: group._id,
          menuUrl: m.menuUrl,
          sequence: m.sequence,
          isActive: true,
          isParent: false,
          parentMenu: null,
          icon: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`  Inserted menu '${m.menuName}' in ${label}.`);
      } else {
        console.log(`  Menu '${m.menuName}' already exists in ${label}.`);
      }
    }

    await conn.close();
  } catch (err) {
    console.error(`Error in ${label}:`, err);
  }
};

const run = async () => {
  await insertMenus(localURI, "Local (pentagon)");
  await insertMenus(atlasURI, "Atlas (portfolios)");
  console.log("Menu insertion complete!");
};

run();
