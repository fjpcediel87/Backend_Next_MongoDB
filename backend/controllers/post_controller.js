import { Post } from "../models/post_model.js"; 
// CRUD (Create, Read, Update, Delete) operations for posts
// Create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const newPost = await Post.create({ name, description, age });

        res.status(201).json({ 
            message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Read all posts
const getPosts = async (req, res) => {
    try {
        const readPosts = await Post.find();
        res.status(200).json({ posts: readPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post (not implemented yet)
const updatePost = async (req, res) => {
    try {

        //basic validation
        // Object.keys(req.body) returns an array of the keys 
        // in the request body. If the length of this array is 0, 
        // it means that the request body is empty and no fields 
        // were provided for updating. In such cases, we return 
        // a 400 Bad Request response with an error message indicating
        //  that at least one field is required to update the post.
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "At least one field is required to update" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        //const { id } = req.params;
        //const { name, description, age } = req.body;
        res.status(200).json({ 
            message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
// Delete a post (not implemented yet)
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);  
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export { 
    
    createPost,
    getPosts,
    updatePost, 
    deletePost
};