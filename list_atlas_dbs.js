import mongoose from "mongoose";

const run = async () => {
  const uri = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/?appName=Cluster0";
  try {
    const conn = await mongoose.connect(uri);
    console.log("Connected to Atlas!");
    const dbs = await conn.connection.db.admin().listDatabases();
    console.log("Databases on Atlas:", dbs.databases.map(d => d.name));
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error listing Atlas dbs:", err);
  }
};

run();
