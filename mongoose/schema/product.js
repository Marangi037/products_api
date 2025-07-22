import mongoose from 'mongoose';
const objectID = mongoose.Schema.Types.ObjectId;
const productSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    owner: {
        type: objectID,
        ref: 'user',
        required: true
    }
});


export const Product = mongoose.model("Product", productSchema);