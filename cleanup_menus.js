import mongoose from "mongoose";

const atlasURI = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/portfolios?retryWrites=true&w=majority&appName=Cluster0";

const cleanupDbMenus = async (dbURI, label) => {
  try {
    const conn = await mongoose.createConnection(dbURI).asPromise();
    console.log(`Connected to ${label}`);

    const groupCol = conn.db.collection("menugroupmasters");
    const menuCol = conn.db.collection("menumasters");

    // 1. Find the "Portfolio Management" group
    const portfolioGroup = await groupCol.findOne({ menuGroupName: "Portfolio Management" });
    if (!portfolioGroup) {
      console.log(`  'Portfolio Management' group not found in ${label}. Seed it first.`);
      await conn.close();
      return;
    }

    // 2. Delete all other menu groups
    const deleteGroupResult = await groupCol.deleteMany({
      _id: { $ne: portfolioGroup._id }
    });
    console.log(`  Deleted ${deleteGroupResult.deletedCount} unnecessary menu groups in ${label}.`);

    // 3. Delete all menus that do not belong to the "Portfolio Management" group
    const deleteMenuResult = await menuCol.deleteMany({
      menuGroup: { $ne: portfolioGroup._id }
    });
    console.log(`  Deleted ${deleteMenuResult.deletedCount} unnecessary menus in ${label}.`);

    await conn.close();
  } catch (err) {
    console.error(`Error cleaning up ${label}:`, err);
  }
};

const run = async () => {
  await cleanupDbMenus(atlasURI, "Atlas (portfolios)");
  console.log("Production Menu cleanup completed successfully!");
};

run();
