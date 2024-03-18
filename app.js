require("dotenv").config()
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");    //we import blog here to show all blogs on a homepage


const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;    //for deployment in which service provider assigns you port.

mongoose.connect(process.env.MONGO_URL)    //connecting with the database using URL from env file.
.then( e => console.log("MOngoDB connected."));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));          //setting up path for views

app.use(express.urlencoded({extended: false}));     //middleware to support form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))  //passing cookie name(token)
app.use(express.static(path.resolve('./public')));   //serving static files(images) from public folder

app.get('/', async (req,res) => {   
    const allBlogs = await Blog.find({});       //fetching all the blogs
    res.render("home", {user: req.user, blogs: allBlogs,});
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);


app.listen(PORT, () => console.log("Server is running on port", PORT));