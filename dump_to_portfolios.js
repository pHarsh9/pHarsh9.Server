import mongoose from "mongoose";

const migrate = async () => {
  const localURI = "mongodb://localhost:27017/pentagon";
  const atlasURI = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/portfolios?retryWrites=true&w=majority&appName=Cluster0";

  try {
    console.log("Connecting to local MongoDB (pentagon)...");
    const srcConn = await mongoose.createConnection(localURI).asPromise();
    console.log("Connected to local database successfully.");

    console.log("Connecting to Atlas MongoDB (portfolios)...");
    const destConn = await mongoose.createConnection(atlasURI).asPromise();
    console.log("Connected to Atlas database successfully.");

    const collections = await srcConn.db.listCollections().toArray();
    console.log(`Found ${collections.length} collections to copy.`);

    for (const colInfo of collections) {
      const colName = colInfo.name;
      if (colName.startsWith("system.")) {
        continue;
      }
      console.log(`Copying collection: ${colName}...`);
      
      const srcCol = srcConn.db.collection(colName);
      const destCol = destConn.db.collection(colName);

      // Clear destination collection first
      await destCol.deleteMany({});

      const docs = await srcCol.find({}).toArray();
      if (docs.length > 0) {
        await destCol.insertMany(docs);
        console.log(`  Copied ${docs.length} documents.`);
      } else {
        console.log(`  Collection was empty.`);
      }
    }

    await srcConn.close();
    await destConn.close();
    console.log("Migration to Atlas 'portfolios' database completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
};

migrate();
