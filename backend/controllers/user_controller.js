import { User } from "../models/user_model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        //basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase()  });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // create new user
        const newUser = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
        });
        
        res.status(201).json({ 
            message: "User registered successfully",
            user: { _id: newUser._id, username: newUser.username, email: newUser.email }
         });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// Added on step 33 (See notebook)
const loginUser = async (req, res) => {
    try{
        // checking if the user exists
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ 
                message: "User does not exist" });
        }
        // check if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ 
                message: "Invalid credentials" });
        }
        // update loggedIn status
        // user.loggedIn = true;
        //await user.save();
        
        res.status(200).json({ 
            message: "User logged in successfully",
            user: { _id: user._id, username: user.username, email: user.email }
         });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });

    }

}
//Added on step 35 (See notebook)
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ 
                message: "User does not exist" });
        }
        // update loggedIn status
        //user.loggedIn = false;
        //await user.save();
        res.status(200).json({ 
            message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Server error" });
    }
}




export {
    registerUser,
    loginUser,
    logoutUser
}
