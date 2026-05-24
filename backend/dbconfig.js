import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// mongoose.connect(process.env.MONGO_URL)
// dotenv.config();
const url=process.env.MONGO_URL;
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(url)
.then(() => {
   console.log("MongoDB Connected");
})
.catch((error) => {
   console.log(error);
});
const dbName="todo-project";

export const client=new MongoClient(url);
export const collectionName="todo"
export const connection =async ()=>{
    const connecct=await client.connect();
    return await connecct.db(dbName)
}
