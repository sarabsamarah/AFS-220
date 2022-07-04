const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

// get all comments (most likely for testing purposes)
commentRouter.route('/').get((req, res, next) => {
        Comment.find((err, comments) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(comments)
        });
    });

// post a new comment based on pose id
commentRouter.route('/add/:poseId').post((req, res, next) => {
        req.body.pose = req.params.poseId;
        req.body.user = req.user._id;

        // console.log("Will this add user", req.body.user)

        const newComment = new Comment(req.body);

        newComment.save((err, savedComment) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(savedComment)
        });
    });

// get all comments based on pose id
// commentRouter.route('/byPose/:poseId')
//     .get((req, res, next) => {
//         Comment.find({ pose: req.params.poseId }, (err, comments) => {
//             if (err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(comments)
//         })
//     })

// get comment based on comment id
commentRouter.route('/:commentId')
    .get((req, res, next) => {

        console.log(req.params)

        Comment.findById(req.params.commentId, (err, comment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comment)
        })
    })

module.exports = commentRouter
