import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
//import axios from 'axios';


var postName = [];
var postText = [];
var imgName = [];

const storage =  multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images for blogs')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    imgName.push(file.originalname);
  }
})

const upload = multer({storage: storage})
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: postName,
    picture: imgName,
  });
});

app.get("/create", (req, res) => {
  res.render("createPost.ejs");
});


app.post("/",upload.single("image"), (req, res) => {
  postName.push(req.body["title"]);
  postText.push(req.body["post"]);
  res.render("index.ejs", {
    title: postName,
    picture: imgName,
  });
});


app.get("/blogPost/:id", (req, res) => {
   const postId = parseInt(req.params.id, 10);
   if (postId >= 0 && postId < postName.length) {
   res.render("blogPost.ejs", {
   title: postName[postId],
  content: postText[postId],
   image: imgName[postId]
   });
   } else {
   res.status(404).send('Post not found');
 }
  });

  app.patch("/", (req, res) => {
    console.log(req.body);
    alert();
  });
  

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
