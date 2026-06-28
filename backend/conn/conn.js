import mongoose from "mongoose";

export const conn = async () =>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to Database");
    }catch(err){
        console.log(err);
    }
}





