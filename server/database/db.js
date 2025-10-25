import mongoose from "mongoose";

const Connection = async (Username, Password) => {
  const URI = `mongodb+srv://${Username}:${Password}@blog-app.4mkkueg.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting with database", error);
  }
};

export default Connection;
