import mongoose from "mongoose";

const run = async () => {
  // Test writing to test database on Atlas
  const uri = "mongodb+srv://hp910patel_db_user:7TKz52s5amxQW9TM@cluster0.ytqefgj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const conn = await mongoose.connect(uri);
    console.log("Connected to Atlas test database!");
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = conn.model("TestWrite", testSchema);
    const doc = new TestModel({ name: "hello" });
    await doc.save();
    console.log("Saved successfully to test!");
    await TestModel.deleteOne({ _id: doc._id });
    console.log("Deleted successfully from test!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error writing to test:", err);
  }
};

run();
