import mongoose from "mongoose";

const dbUri = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/portfolios?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  await mongoose.connect(dbUri);
  const res = await mongoose.connection.db.collection("profilemasters").updateMany(
    {},
    {
      $set: {
        socialLinks: [
          { platform: "LinkedIn", url: "https://linkedin.com/in/pharsh9" },
          { platform: "Instagram", url: "https://instagram.com/p.harsh9" },
          { platform: "GitHub", url: "https://github.com/pharsh9" }
        ]
      }
    }
  );
  console.log("Updated social links in MongoDB:", res);
  process.exit(0);
}

run().catch(console.error);
