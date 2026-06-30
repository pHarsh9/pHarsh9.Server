import mongoose from "mongoose";

const migrate = async () => {
  try {
    const srcConn = await mongoose.createConnection("mongodb://localhost:27017/pentagon").asPromise();
    console.log("Connected to source: pentagon");

    const destConn = await mongoose.createConnection("mongodb://localhost:27017/admin").asPromise();
    console.log("Connected to destination: admin");

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

      // Clear destination collection
      await destCol.deleteMany({});

      const docs = await srcCol.find({}).toArray();
      if (docs.length > 0) {
        // Remove _id or keep it? Keep it so references are preserved!
        await destCol.insertMany(docs);
        console.log(`  Copied ${docs.length} documents.`);
      } else {
        console.log(`  Collection was empty.`);
      }
    }

    await srcConn.close();
    await destConn.close();
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
};

migrate();
