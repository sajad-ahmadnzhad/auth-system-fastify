import mongoose from "mongoose";

export default (async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("mongodb error => ", error);
  }
})();
