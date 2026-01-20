import {Router} from 'express'
import auth from './../middleware/auth.middleware.js';
import { AddCategoryController, getCategoryController } from '../controllers/category.controller.js';

const categoryRouter= Router();

categoryRouter.post("/add-category",auth,AddCategoryController)
categoryRouter.get("/get",auth,getCategoryController)

export default categoryRouter;