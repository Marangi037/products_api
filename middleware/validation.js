import { checkSchema, matchedData, validationResult } from 'express-validator';
import { userValidationSchema } from '../utilis/validationSchema.js';
import { productValidationSchema } from '../utilis/validationSchema.js';


export const validateUserRegistration = [
    checkSchema(userValidationSchema), (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        next();
    },
];

export const validateProduct = [
    checkSchema(productValidationSchema), (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({ errors: result.array() });
        }
        next();
    },
]