import mongoose from "mongoose";

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pentagon");
    const group = await mongoose.connection.db.collection("menugroupmasters").findOne({});
    console.log("Menu Group Sample:", group);

    const menu = await mongoose.connection.db.collection("menumasters").findOne({});
    console.log("Menu Item Sample:", menu);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

run();
