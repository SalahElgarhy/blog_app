
import  { Router } from "express";
import * as userServes from "./User.Servers.js";
const router = Router();


// get single user

router.get("/profile/:id", userServes.userProfile);

// update user


router.patch("/update/:id",userServes.userUpdate )

router.delete("/delete/:id",userServes.userDelete )

router.get("/search", userServes.userSearch)

export default router;