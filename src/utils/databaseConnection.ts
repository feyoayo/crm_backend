import mongoose, { Mongoose } from "mongoose";
import * as process from "process";

export class DatabaseConnection {
  db: Mongoose;
  username: string;
  password: string;

  constructor() {
    this.db = mongoose;
    this.username = process.env.DB_USERNAME ?? "";
    this.password = process.env.DB_PASSWORD ?? "";
  }

  async connect() {
    try {
      await this.db.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mean.j8hqeog.mongodb.net/?retryWrites=true&w=majority`
      );
      console.log("DB Connected successfully");
    } catch (e) {
      console.log("DB Connection error", e);
    }
  }
  async disconnect() {
    await this.db.disconnect();
  }
}

const databaseConnection = new DatabaseConnection();
export default databaseConnection;
