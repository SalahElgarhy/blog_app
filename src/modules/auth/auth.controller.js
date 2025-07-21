
import express, { Router } from "express";
import { Register , Login } from "./auth.Servers.js";

const router = Router();
// sing up

router.post("/signup", Register)

// login user
router.post("/login", Login);


export default router;