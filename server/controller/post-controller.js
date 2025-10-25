

import Post from "../model/post.js"

export const createPost = async(request,response) => {
  try {
    const post = new Post(request.body)
    await post.save()

    return response.status(200).json({msg:"Post created and saved successfully"})
    
  } catch (error) {
    return response.status(500).json({msg:"Error while creating post"})
    
  }

}

export const getAllPosts = async(request, response)=>{
  try {

    const page = parseInt(request.query.page) || 1; // Current page number, default to 1 if not provided
     const limit = parseInt(request.query.limit) || 4; // Number of items per page, default to 4 if not provided
      const skip = (page - 1) * limit; // Calculate the number of items to skip
      const category = request.query.category; // ✅ get from query params
      
      console.log("➡️ Page:", page, "Limit:", limit,"Category:", category); // ✅ check incoming query
      
      const filter = {}; // default: no filter
      if (category && category !== "All Categories" && category !== "") {
        filter.categories = category; // Filter by category
      }
      const totalPosts = await Post.countDocuments(filter); // Get the total number of posts

    let posts = await Post.find(filter)
    .sort({ createdDate: -1 }) // Sort by createdAt field in descending order
    .skip(skip) // Skip the specified number of items
    .limit(limit); // Limit the number of items per page

    return response.status(200).json({msg:"Posts fetched successfully", posts,totalPosts,totalPages: Math.ceil(totalPosts / limit),currentPage: page,})
    
  } catch (error) {
     console.error("❌ Error in getAllPosts:", error);
    return response.status(500).json({msg:error.message})
    
  }
}

export const getPostById = async(request,response) =>{
  try {
    const post = await Post.findById(request.params.id);

    return response.status(200).json({msg:"Post fetched successfully", post})
    
  } catch (error) {
    return response.status(500).json({msg:"Error while fetching post"})
    
  }
}

export const updatePostById = async(request,response) =>{
  try {
    const post = await Post.findById(request.params.id);
    if(!post){
      return response.status(404).json({msg:"Post not found"})
    }

    await Post.findByIdAndUpdate(request.params.id, {$set: request.body});
    return response.status(200).json({msg:"Post updated successfully"})
    
  } catch (error) {
    return response.status(500).json({msg:"Error while updating post", error})
    
  }

}

export const deletePostById = async(request,response)=>{
  try {
    const post = await Post.findById(request.params.id);
    if(!post){
      return response.status(404).json({msg:"Post not found"})
    }
    await post.deleteOne()
    return response.status(200).json({msg:"Post deleted successfully"})
    
  } catch (error) {
    return response.status(500).json({msg:"Error while deleting post"})
    
  }
}