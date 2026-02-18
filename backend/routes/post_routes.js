import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post_controller.js";

const postRouter = Router();

postRouter.post("/create", createPost);
postRouter.get("/allPosts", getPosts);
postRouter.patch("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;