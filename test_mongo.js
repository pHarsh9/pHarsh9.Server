import mongoose from "mongoose";

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pentagon");
    console.log("Connected to pentagon");
    const dbs = await mongoose.connection.db.admin().listDatabases();
    console.log("Databases:", dbs.databases.map(d => d.name));
    
    // Check collections in pentagon
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in pentagon:", collections.map(c => c.name));
    
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

run();
