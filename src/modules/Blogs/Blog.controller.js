import  { Router } from 'express';
import * as serviesBlog from './Blog.Servers.js';

const router = Router();


// blog


router.post("/create", serviesBlog.Create )


router.patch("/update/:blogId", serviesBlog.Update)

// delete blog
router.delete("/delete/:blogId",serviesBlog.Delete )

router.get("/:blogId", serviesBlog.Getone)



router.get("/", serviesBlog.Getall)


export default router;