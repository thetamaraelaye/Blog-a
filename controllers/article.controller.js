//we need article model therefore require the model
const articleModel = require("../models/article.schema");

async function createArticle(req,res, next){
    //need title and content from the FE
    const {title, content} = req.body;
    const user = req.user; //gets user details from authorisation
    console.log("user payload: ", user);

    try{
        //check if user has access to write
        if (!hasWriteAccess(user.user_type)) {
            res.json({
                message: 'Access denied, you need to be either an author or a guest author to write an article.',
                success: false
            });
        }

        if (title.length < 5 && content.length < 20){
            res.json({
                message: 'Title must be at least 5 characters long while content must be at least 20 characters long',
                success: false
            });
        };
        //if content and title length is long enough
        //create article using schema
        const article = new articleModel({
            title: title,
            content: content,
            author: user.id
        });

        //save article
        await article.save();

        return res.json({
            message: 'Article saved successfully',
            success: true,
            artile: article
        })
    } catch(error){
        return res.json({
            message: `an error occured while creating the content, ${error.message} `,
            success: false,
            error: error
        });
    }
};

//to ensure specific types of users are using the create account 
function hasWriteAccess(user_type){
    return ["AUTHOR", "GUEST_AUTHOR"].includes(user_type)
}

async function fetchArticle(req, res, next) {

}
async function fetchArticles(req, res, next) {

}

async function deleteArticle(req, res, next) {

}

async function deleteArticles(req, res, next) {

}


module.exports = {
    createArticle,
    fetchArticle,
    fetchArticles,
    deleteArticle,
    deleteArticles
}
