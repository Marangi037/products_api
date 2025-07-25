import { checkSchema, validationResult } from "express-validator";
import { User } from '../mongoose/schema/user.js';
import jwt from 'jsonwebtoken';


//access token
const generateAccessToken = async function (user){
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2m'}
    );
    return accessToken; 
}

//refresh token
const generateRefreshToken = async function (user) {
    const refreshToken = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    return refreshToken;
 }

//get all users
export const getAllUsersController = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

//register user
export const registerController = async (req, res) => {
    const { body: {username, email ,password }} = req;
    const newUser = new User({
        username, email, password
    });
    const savedUser = await newUser.save();
    if(savedUser) return res.status(201).send("User created successfully.");
};

//login user

export const loginController = async (req, res) => {
    const { body: {email, password }} = req;
    const foundUser = await User.findOne({ email });
    if(!foundUser) return res.status(404).send('User does not exist.');

    const match = await foundUser.isValidPassword(password);
    if(!match) return res.status(401).send("Incorrect password");

    const accessToken = await generateAccessToken({ id: foundUser._id });
    const refreshToken = await generateRefreshToken({id: foundUser._id });
    foundUser.refreshToken = refreshToken;
    const refreshTokenResult = foundUser.save();
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

    return res.status(200).json({ "Access Token":  accessToken });
};

//update user

export const updateController = async (req, res) => {
    const {params:{id}} = req;
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if(!user){
        return res.status(404).send("User not found");
    }else{
        return res.status(201).send(`update for ${user.username} successful`);
    }
    
};

//delete user

export const deleteController = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send("User not found");
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send(`deleted ${user.username} successfully`);
    }catch(err){
        res.status(400).send(err);
    }
};

//refresh token
export const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).send("Refresh token not found");
    } 
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = await generateAccessToken({id: user.id });
    res.json({ "newAccessToken": accessToken })

};

//logout token
export const logoutController = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).send("no refresh token available");
    } 
    const foundUser = await User.findOne({ refreshToken });
    if(!foundUser){
        return res.status(400).send("no user found");
    } 
    foundUser.refreshToken = null;
    const result = await foundUser.save();
    res.clearCookie("refreshToken");
    res.status(200).send("logged out successfully");
};