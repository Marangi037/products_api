export const userValidationSchema = {
    username: {
        in: ['body'],
        isLength: {
            options: {
                 min: 5,
                max: 32
            },
            errorMessage: "Userame should have a minimum of five characters and a maximum of 32 characters"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        escape: true,
        trim: true,
        optional: true
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: "Invalid email format"
        },
        notEmpty: {
            errorMessage: "Email cannot be empty"
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        in: ['body'],
        isLength: {
            options:{
                min: 5, 
                max: 32
            },
        errorMessage: 'Password can only have a min of 5 characters and a max of 32 characters'
        },
        notEmpty: {
            errorMessage: "Password cannot be empty"
        }
    }
}


export const productValidationSchema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Name can only have a min of 5 characters and a minimum of 32 characters"
        },
        escape: true,
        notEmpty: {
            errorMessage: 'Name cannot be empty'
        }
    },
    price: {
        isInt: true,
        notEmpty: {
            errorMessage: "Price cannot be empty"
        }
    },
    description: {
        isString: true,
        notEmpty: {
            errorMessage: "description cannot be empty"
        },
        escape: true
    }
}