if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();    
}

const express = require('express');
//require my routes
const authRouter = require('./routes/auth.router');
// const userRouter = require('./routes/user.router');
// const articleRouter = require('./routes/article.router');

//bring in mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


async function startDB(){
    try {
       await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       })
       console.log("Database is connected.") 
    } catch (error) {
        console.log(`Database failed to connect: ${error.message}`);
    }
}


startDB();
const app = express();

//set up exress middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//mount routes
app.use("/auth", authRouter);
// app.use("/user", userRouter);
// app.use("/article", articleRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
