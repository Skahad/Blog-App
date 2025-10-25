
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

let gfs;
mongoose.connection.once("open",()=>{
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
    bucketName: "photos"
  })
  console.log("GridFS bucket connected");
})

const BASE_URL = process.env.BASE_URL
export const uploadImage = async(request, response) =>{
  if(!request.file){
    return response.status(400).json({msg:"No file uploaded"})
  }
  
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
      bucketName: "photos"
    })

    const filename = `${Date.now()}-blog-${request.file.originalname}`;
    const uploadStream = bucket.openUploadStream(filename,{
      contentType: request.file.mimetype,
    });

    uploadStream.end(request.file.buffer);

    uploadStream.on("finish", ()=>{
      const ImageUrl = `${BASE_URL}/file/${filename}`;
      console.log("File stored", filename);
      response.status(200).json({msg: "File uploaded successfully",
      filename, ImageUrl})
    })
    uploadStream.on("error", (error)=>{
      response.status(500).json({msg:"Error while uploading file", error: error.message})
    })
    
  } catch (error) {
    response.status(500).json({msg:"Internal server error", error: error.message})
    
  }

};

export const getImage = async(request, response)=>{
  try {
    const file = await mongoose.connection.db.collection("photos.files").findOne({filename: request.params.filename});
    if(!file){
      return response.status(404).json({msg: "File not found"})
    }
    const downloadStream = gfs.openDownloadStreamByName(request.params.filename);
    response.set("Content-Type", file.contentType);
    downloadStream.pipe(response);
    downloadStream.on("error", (error)=>{
      response.status(500).json({msg:"Error while downloading file", error: error.message})
    })
  } catch (error) {
    response.status(500).json({msg:"Something went wrong", error: error.message});
    
  }
}