import {Router} from 'express'
import auth from '../middleware/auth.middleware.js';
import uploadImageCatagory from '../controllers/uploadImage.controller.js';
import upload from '../middleware/multer.js';

const uploadRoutes = Router()

uploadRoutes.post("/upload",auth,upload.single('image'),uploadImageCatagory)

export default uploadRoutes;

