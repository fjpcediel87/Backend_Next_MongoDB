import express from "express";

const app = express();

app.use(express.json()); // also includes in step 31 (see Notebook)

// routes import
import router from "../routes/user_routes.js";

app.use("/api/v1/users", router);

//example route: http://localhost:3000/api/v1/users/register



export default app;