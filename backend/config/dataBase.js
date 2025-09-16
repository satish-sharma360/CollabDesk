import mongoose from "mongoose";

const connectDB = () =>{
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/collabDesk`)
        console.log('DataBase connected Successfully...')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB