require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session")
const cookieParser= require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorMiddleware);

app.use(cookieSession({
    name: 'session',
    keys: ["this's my secret"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const start = async() => {
  try {
      app.listen(PORT, () => console.log(`server was running on PORT = ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start()

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connect to DB");
});
mongoose.connection.on("error", (err) => {
  console.log("Not succesfull conection to database" + err);
});





































// var cookieSession = require('cookie-session')
// var express = require('express');
// var bodyParser = require('body-parser');
// var mongodb = require('mongodb');
// const { default: mongoose } = require('mongoose');
// // var MongoClient = require('mongodb').MongoClient, 
// // Server = require("mongodb").Server;
// // var ObjectId = require('mongodb').ObjectId
// // var db = require('./db');
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const Post = require('./models/post');
// const User = require('./models/user');
// const morgan = require('morgan');
// const res = require('express/lib/response');

// var app = express();

// app.set('view engine', 'ejs');

// app.use(express.json())

// var jsonParser = bodyParser.json()
// // var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(express.urlencoded({ extended: false }));

// const PORT = 3000;
// const db = 'mongodb+srv://romanov:romanov@cluster0.d87zx.mongodb.net/dbForApi?retryWrites=true&w=majority';

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((res) => console.log('Connect to DB'))
//   .catch((error) => console.log(error));

//   const server = http.createServer((req,res) => {
//       console.log('Server request');
//   });

//   app.listen(PORT, (error) => {
//       error ?  console.log(error) : console.log(`listening port ${PORT}`);
//   });

// const createPath = (page) => path.resolve(__dirname, 'ejs-page', `${page}.ejs`);

// app.use(cookieSession({
//     name: 'session',
//     keys: ["this is my secret"],

//     // Cookie
//     maxAge: 24 * 60 * 60 * 1000 
// }));
// //     // welcome page
// // app.get('/', (req, res) => {
// //     res.render(createPath('index'));
// // });

// // WHERE LOGGED IN
// app.get('/welcome', (req, res) => {
//     if(req.session.user){
//         return res.redirect('/');
//     }
//     res.sendFile(__dirname + '/index.html');
//   });

// app.get('/posts/:id', (req, res) => {
//     Post
//     .findById(req.params.id)
//     .then((post) => res.render(createPath('post'), { post }))
//     .catch((error) => {
//         console.log(error);
//         res.render(createPath('error'), { title: 'Error' });
//     });
//     // User
//     // .find()
//     // .catch((error) => {
//     //     console.log(error);
//     //     res.render(createPath('error'), { title: 'Error' });
//     // });

// });

// app.get('/posts', (req, res) => {
//   Post
//     .find()
//     .sort({ createdAt: -1 })
//     .then((posts) => res.render(createPath('posts'), { posts }))
//     .catch((error) => {
//         console.log(error);
//         res.render(createPath('error'), { title: 'Error' });
//     });
//    });

//    app.post('/add-people', (req, res) => {
//     User
//       .find()
//       .then((posts) => res.render(createPath('add-people'), { posts }))
//       .catch((error) => {
//           console.log(error);
//           res.render(createPath('error'), { title: 'Error' });
//       });
//      });



//    app.delete('/posts/:id', (req, res) => {
//     Post
//     .findByIdAndDelete(req.params.id)
//     .then((result) => {
//         res.sendStatus(200);
//     })
//     .catch((error) => {
//         console.log(error);
//         res.render(createPath('error'), { title: 'Error' });
//     });
// });



// // app.post('/signin', (req, res) => {
// //     const { name, password } = req.body;
// //     const post = new Post({ name, lastname });
// //    post
// //        .save()
// //        .then((result) =>  res.redirect('/posts'))
// //        .catch((error) => {
// //            console.log(error);
// //            res.render(createPath('error'), { title: 'Error' });
// //         });
// // });

// // app.post('/signup', (req, res) => {
// //     const { name, password } = req.body;
// //     const post = new Post({ name, lastname });
// //    post
// //        .save()
// //        .then((result) =>  res.redirect('/posts'))
// //        .catch((error) => {
// //            console.log(error);
// //            res.render(createPath('error'), { title: 'Error' });
// //         });
// // });

// // app.post("/", function (req, res) {
// //     const token = req.body.accessToken;
// //     User.findOne(
// //       {
// //         accessToken: token,
// //       },
// //       function (error, user) {
// //         if (user === null) {
// //           res.json({
// //             status: "error",
// //             message: "User has been logged out. Please login again.",
// //           });
// //         } else {
// //           User.find().then((user) =>
// //             res.json({
// //               status: "success",
// //               message: "Record has been fetched.",
// //               user: user,
// //             })
// //           );
// //         }
// //       }
// //     );
// //   });

// //   app.post("/sendFriendRequest", function (req, res) {
// //     const accessToken = req.body.accessToken;
// //     const _id = req.body._id;
  
// //     User.findOne(
// //       {
// //         accessToken: accessToken,
// //       },
// //       function (error, user) {
// //         if (user == null) {
// //           res.json({
// //             status: "error",
// //             message: "User has been logged out. Please login again",
// //           });
// //         } else {
// //           const me = user;
// //           User.findOne(
// //             {
// //               _id: ObjectId(_id),
// //             },
// //             function (error, user) {
// //               if (user == null) {
// //                 res.json({
// //                   status: "error",
// //                   message: "User does not exist",
// //                 });
// //               } else {
// //                 User.updateOne(
// //                   {
// //                     _id: _id,
// //                   },
// //                   {
// //                     $push: {
// //                       friends: {
// //                         _id: me._id,
// //                         name: me.name,
// //                         status: "Pending",
// //                         sentByMe: false,
// //                         inbox: [],
// //                       },
// //                     },
// //                   },
// //                   function (error, data) {
// //                     User.updateOne(
// //                       {
// //                         _id: me._id,
// //                       },
// //                       {
// //                         $push: {
// //                           friends: {
// //                             _id: user._id,
// //                             name: user.name,
// //                             status: "Pending",
// //                             sentByMe: true,
// //                             inbox: [],
// //                           },
// //                         },
// //                       },
// //                       function (error, data) {
// //                         res.json({
// //                           status: "success",
// //                           message: "Friend request has been sent.",
// //                         });
// //                       }
// //                     );
// //                   }
// //                 );
// //               }
// //             }
// //           );
// //         }
// //       }
// //     );
// //   });

// //   router.post("/acceptFriendRequest", function (req, res) {
// //     const accessToken = req.body.accessToken;
// //     const _id = req.body._id;
// //     User.findOne(
// //       {
// //         accessToken: accessToken,
// //       },
// //       function (error, user) {
// //         if (user == null) {
// //           res.json({
// //             status: "error",
// //             message: "User has been logged out. Please login again",
// //           });
// //         } else {
// //           const me = user;
// //           User.findOne(
// //             {
// //               _id: _id,
// //             },
// //             function (error, user) {
// //               if (user == null) {
// //                 res.json({ status: "error", message: "User does not exist" });
// //               } else {
// //                 User.updateOne(
// //                   {
// //                     _id: _id,
// //                   },
// //                   {
// //                     $push: {
// //                       notification: {
// //                         _id: _id,
// //                         type: "friend_request_accepted",
// //                         content: me.name + " accepted your friend request.",
// //                         createdAt: new Date().getTime(),
// //                       },
// //                     },
// //                   }
// //                 );
// //                 User.updateOne(
// //                   {
// //                     $and: [
// //                       {
// //                         _id: _id,
// //                       },
// //                       {
// //                         "friends._id": me._id,
// //                       },
// //                     ],
// //                   },
// //                   {
// //                     $set: {
// //                       "friends.$.status": "Accepted",
// //                     },
// //                   },
// //                   function (error, data) {
// //                     User.updateOne(
// //                       {
// //                         $and: [
// //                           {
// //                             _id: me._id,
// //                           },
// //                           {
// //                             "friends._id": user._id,
// //                           },
// //                         ],
// //                       },
// //                       {
// //                         $set: {
// //                           "friends.$.status": "Accepted",
// //                         },
// //                       },
// //                       function (error, data) {
// //                         res.json({
// //                           status: "success",
// //                           message: "Friend request has been accepted.",
// //                         });
// //                       }
// //                     );
// //                   }
// //                 );
// //               }
// //             }
// //           );
// //         }
// //       }
// //     );
// //   });


// app.post('/', (req, res) => {
//     const { name, lastname } = req.body;
//     const post = new Post({ name, lastname });
//    post
//        .save()
//        .then((result) =>  res.redirect('/posts'))
//        .catch((error) => {
//            console.log(error);
//            res.render(createPath('error'), { title: 'Error' });
//         });
// });

// app.use((req,res) => {
//     res.render(createPath('error'));
// });
