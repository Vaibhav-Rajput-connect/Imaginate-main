import mongoose from "mongoose";
import 'dotenv/config'
import imageModel from "./models/imageModel.js";
import userModel from "./models/userModel.js";

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");

        const users = await userModel.find({});
        console.log("Users:", users.length);
        users.forEach(u => console.log(`User: ${u.name}, ID: ${u._id}, Credits: ${u.creditBalance}`));

        const images = await imageModel.find({});
        console.log("Images:", images.length);
        images.forEach(i => console.log(`Image: ${i.prompt}, UserID: ${i.userId}`));

    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
};

checkDB();
