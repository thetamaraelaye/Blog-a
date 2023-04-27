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

//create a mode to bd used for crud operation
const userModel = mongoose.model('user', userSchema);
// export to make it available in the code
module.exports = userModel;