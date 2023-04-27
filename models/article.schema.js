const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author: { //ref the user id
        type: mongoose.Schema.Types.ObjectId, //uses 
        ref: 'userSchema',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    status: {
        type: 'string',
        enum: ['DRAFT', 'PUBLISHED'],
        required: true,
        default: 'DRAFT',
    },
    content: {
        type: 'string',
        required: true, 
    },
    published_at: { 
        type: Date, 
        required: false,
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
const articleModel = mongoose.model('article', articleSchema);
// export to make it available in the code
module.exports = articleModel;