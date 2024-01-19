import Mongoose from "mongoose";

export async function connectDatabase() {
  const databaseURI = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;
  try {
    await Mongoose.connect(`${databaseURI}/${databaseName}`);
    console.log(`\nMongoDB connected on host: ${Mongoose.connection.host}`);
  } catch (error) {
    console.log("Error Occurred while connecting to database: ", error.message);
  }
}
