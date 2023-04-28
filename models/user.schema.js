const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: 'string',
        required: true,
        unique: true,
    },
    first_name: {
        type: 'string',
        required: true,
    },
    last_name: {
        type: 'string',
        required: true,
    },
    user_type: {
        type: 'string',
        enum: ['USER', 'GUEST_AUTHOR', 'AUTHOR'],
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    dob: {
        type: 'string',
        required: true, 
    },
    created_at: { 
        type: Date, 
        default: Date.now(),
    },
    updated_at: { 
        type: Date, 
        default: Date.now(),
    }
});

//create a model to be used for crud operation
//it was created for CRUD operations therefore it would be used as the reference schema
const userModel = mongoose.model('user', userSchema); //the name of my model is user and it would be referenced by other schemas
// export to make it available in the code
module.exports = userModel;