import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRoute from './routes/users.js';
import productsRoute from './routes/products.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//user's route
app.use("/users", usersRoute);
//products route
app.use("/products", productsRoute);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) =>  console.error(err));


const PORT = process.env.PORT;
app.listen((PORT), () => {
    console.log(`Server running on port ${PORT}`);
})
