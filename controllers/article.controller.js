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
                success: false,
            });
        }

        if (title.length < 5 && content.length < 20){
            res.json({
                message: 'Title must be at least 5 characters long while content must be at least 20 characters long',
                success: false,
            });
        };
        //if content and title length is long enough
        //create article using schema
        const article = new articleModel({
            title: title,
            content: content,
            author: user.id,
        });

        //save article
        await article.save();

        return res.json({
            message: 'Article saved successfully',
            success: true,
            artile: article,
        })
    } catch(error){
        return res.json({
            message: `an error occured while creating the content, ${error.message} `,
            success: false,
            error: error,
        });
    }
};

//to ensure specific types of users are using the create account 
function hasWriteAccess(user_type){
    return ["AUTHOR", "GUEST_AUTHOR"].includes(user_type)
}

async function fetchArticle(req, res) {
    //the id was referenced in the article schema therefore we will get the article by the id
    //req the id of author or guest author
    const {id} = req.params; 

    try {
        //use findOne() to find the  articles by author id then populate with all s
        const article = await articleModel.findOne({_id: id}).populate('author','user_name').exec(); //find article by id gotten
            //check if no article was found return an error
            if(!article) {
                return res.json({
                    success: false,
                    message: "Article not found",
                    error: error  
            })
        }
            return res.json({
                message: "Article",
                success: true,
                article: article
            })
    } catch (error) {
        return res.json({
            success: false,
            message: `An error occured while fetching article with id ${id}: ${error.message}`,
            error:error
        })
    }
}
async function fetchArticles(req, res) {

    try {
        //use await model to find the article
        //populate the fetch findings with all the details of the author that wrote the article
        //recall author and blog article are related by user id on schema
        //populate method is used populate('author') will get all the author details because his id was ref
        // to remove the returning of too much info about user
        //pass in only one req field. Passing more than one will return error
        const articles = await articleModel.find().populate('author', 'user_name').exec();
            //find becomes an array that returns the length of the articles
            return res.json({
                message: "Articles",
                count: articles.length,
                success: true,
                article: articles
            })
    } catch (error) {
        return res.json({
            success: false,
            message: "An error occured while fetching articles",
            error: error
        })
    
    }
}
//To Delete Article/Articles
//You must have access to write an article and you must be the author of the articles you want to delete
//without permission delete access is denied
async function deleteArticle(req, res) {
     //the id was referenced in the article schema therefore we will get the article by the id
    //req the id of author or guest author
    const {id} = req.params;
    //required for the user and his access token
    const user = req.user;

    try {
        //use findOne() to find the  articles by article id for deletion
        //populate with id to check if the user is authorised to delete articles
        
        const article = await articleModel.findOne({_id: id}).populate('author', '_id').exec(); //find article by id gotten
            //check if no article was found return an error
            if(!article) {
                return res.json({
                    success: false,
                    message: "Article not found",
                })
            }
            //check if the person has write access because only writers can delete. This would require
            //tweaking the findOne by populating it with the user ID's
            //user id is not a string, terefore convert id to string and convert it string
            //and compare it to the user id ref on the article model instance creaated
            const isAuthor = (user.id.toString() === article.author._id.toString()) ? true : false;
            // wait for the deletion to occur before returning message in next lines of code

            //check access 
            if (!hasWriteAccess(user.user_type) && !isAuthor){
                res.json({
                    message: "Access denied, can't delete someone's article",
                    success: false,
                })
            }
            await articleModel.deleteOne({_id: id}).exec();

            return res.json({
                message: "Article Deleted",
                success: true,
                deleted: true,
            })
    } catch (error) {
        return res.json({
            success: false,
            message: `An error occured while deleting  the article with id ${id}: ${error.message}`,
            error: error
        })
    
    }
}

// async function deleteArticles(req,res) {
//     //req access to id of author ref. in article schema
//     const {id} = req.params;
//     //request access to user
//     const user = req.user;

//     try {
//         //use findOne() to find all the  articles by article id for deletion
//         //populate with id to check if the user is authorised to delete articles 
//         //i.e all the articles created by this user
        
//         const article = await articleModel.find().populate('author', '_id').exec(); //find article by id gotten
//             //check if no article was found return an error
//             if(!article) {
//                 return res.json({
//                     success: false,
//                     message: "Article not found",
//                 })
//             }
//             //check if the person has write access because only writers can delete. This would require
//             //tweaking the findOne by populating it with the user ID's
//             //user id is not a string, therefore convert id to string and convert it string
//             //and compare it to the user id ref on the article model instance creaated
//             const isAuthor = (user.id.toString() === article.author._id.toString()) ? true : false;
//             // wait for the deletion to occur before returning message in next lines of code

//             //check access 
//             if (!hasWriteAccess(user.user_type) && !isAuthor){
//                 res.json({
//                     message: "Access denied, can't delete the articles written by someone else",
//                     success: false,
//                 })
//             }
//             await articleModel.deleteMany().exec();

//             return res.json({
//                 message: `All Articles by ${user.id}} has been deleted`,
//                 deletedCount: article.length,
//                 success: true,
//                 deleted: true,
//             })
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: `An error occured while deleting all your articles: ${error.message}`,
//             error: error
//         })
    
//     }
// }



module.exports = {
    createArticle,
    fetchArticle,
    fetchArticles,
    deleteArticle
}
