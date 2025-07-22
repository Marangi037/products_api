import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';
const objectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,

    },
    refreshToken: {
        type: mongoose.Schema.Types.String
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});
 //hash password

 userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
 });

 userSchema.methods.isValidPassword = async function(enteredPassword){
    try{
        return await bcrypt.compare(enteredPassword, this.password);
    }catch(error){
        throw new Error('Password comparison failed');
    }
 };
export const User = mongoose.model('User', userSchema);