//we need article model therefore require the model
const articleModel = require("../models/article.schema");

async function createArticle(req,res, next){
    //need title and content from the FE
    const {title, content} = req.body;
    const user = req.user; //gets user details from authorisation
    console.log("user payload: ", user);

    try{
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




module.exports = {createArticle};
