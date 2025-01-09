import mongoose from "mongoose";

export default async function connectDB  () {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("***** connect DB *****");

    } catch (error) {
        console.log("error connecting" + error);
        process.exit(1)
    }
}

