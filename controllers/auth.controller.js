//we need  the user model in the auth controller require the model
const userModel = require("../models/user.schema");
//it is best practise to encrypt passwords esp ones with sensitive information
//therefore use the bcrypt password to encrypt the password
const bcrypt = require("bcryptjs");
//require jwt
const jwt = require("jsonwebtoken");

//next is a function that moves from one functionality to the next
async function createUser(req, res) {
    const { user_name, first_name, last_name, user_type, dob, password } = req.body; //use req.body function o destructure the props of userModel
    //check if the user has been created
    //if user exist an error message is returned
    //prevents user duplication and errors
    try {
        //check if user exist
        const checkUserExist = await userModel.findOne({user_name: user_name}).exec();
        // the findone function takes in an object of arg that would be the filter used to search the field req
        if (checkUserExist) {
            //this means there is a user
            return res.json({
                success: false,
                message: 'User already exists, login in'
            });
        }
        const hashedPassword = await bcrypt.hashSync(password, 10); //the agruments are the password and the number of characters used to hash the pword
        //save the user info
        const user = new userModel({ //create user by creating a instance of the userModel
            user_name: user_name,
            first_name: first_name,
            last_name: last_name,
            user_type: user_type,
            dob: dob,
            password: hashedPassword,
        });

        await user.save(); //wait for all the information of the user to be gotten then save the user

        return res.json({
            success: true,
            message: 'User saved successfully',
            status: 201,
        });

    } catch (err) {
        return res.json({  //err will be returned in json format
        error: err,
        success: false,
        Message: `An error occured while creating the user: ${err.message}`
        });
    }
};

async function login(req, res) {
    const {user_name, password } = req.body;
    try {
        const checkUserExist = await userModel.findOne({user_name: user_name }).exec();

        if(!checkUserExist){
            //this means  user is not in db
            return res.json({
                success: false,
                message: 'User does not exist, create an account'
            });
        };
        //ifuser exist, check if password is correct
        // const isCorrect = await bcrypt

        //console.log('paswword_test: ', isCorrect);
        //if it is not the correct password a response is sent error
        if(!await bcrypt.compareSync(password, checkUserExist.password)){
            return res.json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        //store the user details in the token payload then use jwt for tis
        const tokenPayload = {
            user_name: checkUserExist.user_name,
            user_type: checkUserExist.user_type,
            id: checkUserExist._id.toString()
        }
        //jwt is used to ceate token
        //jwt.sign()expects arg to be either string or object
        //second arg is a secret key
        //third arg is when string expires
        const access_token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, { expiresIn: "15m"} );
        //if successful
        return res.json({
            success: true,
            message: "User login successful",
            status: 200,
            access_token: access_token,
        })
    } catch(err) {
        return res.json({
            error: err,
            success: false,
            message: "User login unsuccessful"
        })
    }
};

//export two functions which would be exported in the object
module.exports = {createUser, login};