const express = require("express");
const yogaRouter= express.Router();
const { v4: uuidv4 } = require('uuid');


const poses = [
    {
        name: "Mountain",
        sanskirt: "Tadasana",
        balancing: true,
        type: "Standing",
        _id: uuidv4()
    },
    {
        name: "Hero",
        sanskirt: "Virasana",
        balancing: false,
        type: "Seated backbend",
        _id: uuidv4()
    },
    {
        name: "Headstand",
        sanskirt: "Sirsasana",
        balancing: true,
        type: "Inversion",
        _id: uuidv4()
    }
  ];

  yogaRouter
    .get('/', (req, res, next) => {
        res.status(200).send(poses);
    }) //GET all
  

    .get('/:poseId', (req, res, next) => {
        const poseId = req.params.poseId;
        const singlePose = poses.find(pose => poseId._id === poseId);
        if (!singlePose) {
            const error = new Error("No Matching Criteria");
            return next(error);
          }
          res.status(200).send(singularPose);
        }) //GET one
      

    .get('search/_id', (req, res, next) => {
        const poseId = req.query._id;
        const filteredPose = poses.filter(pose => poseId._id === poseId);
        if (!filteredPose) {
            const error = new Error("No Matching Criteria");
            return next(error);
          }
          res.status(200).send(filteredPose);
        }) //GET by id

        .get('/search/type', (req, res, next) => {
            const type = req.query.type;
            console.log(type);
        
            if (!type) {
              const error = new Error("You must provide a valid type.");
              return next(error);
            }
            const filteredPose = poses.filter(pose => pose.type === type);
            res.status(200).send(filteredPose);
          }) //GET by type

    .post('/', (req, res, next) => {
        const newPose = req.body
        newPose._id = uuidv4()
        poses.push(newPose)
        
        res.status(201).send(newPose);
  }) //POST one


    .delete('/:poseId', (req, res, next) => {
        const poseId = req.params.poseId;
        const poseIdIndex = poses.findIndex(pose => poseId._id === poseId);
        poses.splice(poseIndex, 1);
        res.send("Resource successfully deleted!");
  }) //DELETE one


    .put('/:poseId', (req, res, next) => {
        const poseId = req.params.poseId;
        const poseIndex = poses.findIndex(pose => poseId._id === poseId);
        Object.assign(poses[poseIndex], req.body );
        res.status(201).send("Resource Successfully Updated!");
  }); //EDIT one
module.exports = yogaRouter;

