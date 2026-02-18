import { Router } from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/user_controller.js";

const router = Router();

//router.route("/register").post(registerUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;