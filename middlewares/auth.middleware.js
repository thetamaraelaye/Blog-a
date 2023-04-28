// rea passes through here before going to the next line of code/
const jwt = require('jsonwebtoken');
function verifyAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({
            message: 'access_token_missing',
            success: false
        });
    }

    //if access token is present, check if it is valid or expired
    //check the value of the authorizaation token
    //between the access token and Bearer is a space so we would splitthe string into
    //bearer and token where the array it is split into will have 2 elemens
    //token is the second lement witn an index of 1
    const token = authHeader.split(" ")[1];
    //verify the token
    isValidAccessToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //LAST IF STATEMENT IS NOT NECESSARY AS JWT DOES AND THROWS ERROR BY ITSELF
    if(!isValidAccessToken) {
        return res.json({
            message: 'Invalid or expired access token',
            success: false
        })
    }
//if token has not expired and it is correct
    req.user = isValidAccessToken; //now the user has been verified and is available in every route
    //that uses this middleware
    next(); //passes control to the next function
};

module.exports = verifyAuth;