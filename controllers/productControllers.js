import { Product } from '../mongoose/schema/product.js';


//get all products

export const getAllProductsController = async(req, res) => {
    const { user: {id}} = req;
    try{
        const products = await Product.find({owner: id});
        res.status(200).json(products)
    }catch(error){
        return res.status(400).send(error);
    }
    
};

export const createProductController = async (req, res) => {
    const data = req.body;
    const { user: {id}} = req;
    const newProduct = new Product({ ...data, owner: id });
    const savedProduct = await newProduct.save();
    if(savedProduct){
        res.status(201).send("Product created successfully\n");
    }
};

export const updateProductController = async (req, res) => {
    const updates = req.body;
    const {params: {id}} = req;
    const userId = req.user.id;
    const filter = { _id: id, owner: userId };
    const user = await Product.findOneAndUpdate(filter, updates, { new: true });
    if(!user){
        res.status(404).send("User not found");
    }
    res.status(201).json(user);
    }

export const getProductController = async (req, res) => {
    const { params: { id }} = req;
    const userId = req.user.id;
    const foundProduct = await Product.findOne({ _id: id, owner: userId });
    if(!foundProduct){
        return res.status(404).send("Product not found");
    }
    else{
        res.status(200).send(foundProduct);
    }   
   
    
};

export const deleteProductController = async(req, res) => {
    const {params: {id}} = req;
    const userId = req.user.id;
    try{
        const foundProduct = await Product.findOneAndDelete({ _id: id, owner: userId });
        if(!foundProduct){
            return res.status(404).send("Product doesn't exist");
        }else{
            return res.sendStatus(204);
        }
        
    }catch(err){
        res.status(400).send(err);
    }
};