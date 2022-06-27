const express = require('express')
const poseRouter = express.Router()
const Pose = require('../models/pose')
const Votes = require('../models/votes')
// const { default: Poses } = require('../../my-app/src/components/Poses')
console.log(Pose)
/// get all poses
poseRouter.route('/')
.get((req, res, next) => {
    Pose.find((err, poses) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(poses)
    })
})

// post new pose with user id
poseRouter.route('/')
.post((req, res, next) => {
    req.body.user = req.user._id

    const newPose = new Pose(req.body)

    newPose.save((err, savedPose) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPose)
    })
})

// get all poses based on user id
poseRouter.route('/user')
.get((req, res, next) => {
    console.log(Pose)
    Pose.find({ user: req.user._id }, (err, poses) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        console.log(poses)
        return res.status(200).send(poses)
    })
})

// up vote a pose
poseRouter.route('/upvote/:poseId')
//check for current vote by this user
.get((req, res, next) => {
        Votes.find({ pose: req.params.poseId, user: req.user._id }, (err, vote) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(vote)
        })
    })

.put((req, res, next) => {
    Pose.findOneAndUpdate(
        { _id: req.params.poseId },
        { $inc: { votes: 1 }},
        { new: true },
        (err, updatedPose) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPose)
        })
})

// add item to votes for this user
poseRouter.route('/vote/:poseId')
.post((req, res, next) => {
    req.body.pose = req.params.poseId
    req.body.user = req.user._id
    req.body.vote = 'upvote'

    const newVote = new Votes(req.body)

    newVote.save((err, savedVote) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedVote)
    })
})

// down vote a pose
poseRouter.route('/downVote/:poseId')
//check for current vote by this user
.get((req, res, next) => {
    Votes.find({ pose: req.params.poseId, user: req.user._id }, (err, vote) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(vote)
    })
})

.put((req, res, next) => {
    pose.findOneAndUpdate(
        { _id: req.params.poseId },
        { $inc: { votes: -1 }},
        { new: true },
        (err, updatedPose) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPose)
        })
})

module.exports = poseRouter