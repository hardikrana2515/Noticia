import Note from "../models/notes.model.js";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";


const getallNotes = asyncHandler(async(req,res)=>{
    
    const note = await Note.find({user : req.user._id})
    try{
        return res.status(200).json(new ApiResponse(200,note,"user's notes fatched succesfully..."))
    }catch{
        res.status(400)
        throw new ApiError(400,'User not found')
    }
    
})

const createNote = asyncHandler(async(req,res)=>{
    const {title,discription,tag} = req.body

    if(!title || !discription){
        throw new ApiError(401,"Please fill all the field")
    }
    const note = await Note.create({
        title,
        discription,
        tag,
        user: req.user._id
    })

    try{
        return res.status(200).json(new ApiResponse(200,note,"Note Succesfully Ceated..."))
    }catch{
        throw new ApiError(400,"Failed to create Notes...")
    }
    
})

const updateNote = asyncHandler(async(req,res)=>{
    const {title,discription,tag} = req.body


    const note = await Note.findById(req.params.id)
     if(!note){
        throw new ApiError(404,"Not Found")
    }

     if (!title && !discription && !tag) {
  throw new ApiError(400, "Nothing to update");
    }
    
     if(note.user.toString() !== req.user._id.toString()){
        throw new ApiError(403,"Unauthorized to update this note")
     }

    const updatednote = await Note.findByIdAndUpdate(req.params.id,{
        $set:{
            title,
            discription,
            tag
        }},
    {
        new : true
    })
   
    return res.status(200).json(new ApiResponse(200,updatednote,"Note updated succesfully."))
})

const deleteNote = asyncHandler(async(req,res)=>{

     const note = await Note.findById(req.params.id)

     if(!note){
        throw new ApiError(404,"Not Found")
    }

    if(note.user.toString() !== req.user._id.toString()){
        throw new ApiError(403,"Unauthorized to update this note")
     }

     await Note.findByIdAndDelete(req.params.id)

     res.status(200).json(200,"","Note Removed succesfully")
})
export { getallNotes ,createNote,updateNote,deleteNote}