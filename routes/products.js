import { Router } from 'express';
import { validateProduct } from '../middleware/validation.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { createProductController, deleteProductController, getAllProductsController, getProductController, updateProductController } from '../controllers/productControllers.js';
const router = Router();

//get all products
router.get("/", verifyJWT, getAllProductsController);

//create product
router.post("/", verifyJWT, validateProduct, createProductController);

//Get single product by id

router.get("/:id", verifyJWT, getProductController);


//update product
router.patch("/:id", verifyJWT, validateProduct, updateProductController);

//delete product
router.delete("/:id", verifyJWT, deleteProductController);


export default router