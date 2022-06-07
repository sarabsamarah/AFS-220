import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Poses from './components/Poses'
import AddYogaForm from './components/AddYogaForm.js'
import Search from "./components/searchPose"



function App() {
    const [poses, setPoses] = useState([])

    const getPoses = (() => {
        axios.get('/poses')
            .then(res => setPoses(res.data))
            .catch(err => console.log(err))
    })

    const addPose = ((newPose) => {
        axios.post('/poses', newPose)
            .then(res => {
                setPoses(prevPoses => [...prevPoses, res.data])
            })
            .catch(err => console.log(err))
    })

    const deletePose = (poseId) => {
        axios.delete(`/poses/${poseId}`)
            .then(res => {
                setPoses(prevPoses => prevPoses.filter(pose => pose._id !== poseId))
            })
            .catch(err => console.log(err))
    }

   

    const editPose = ((updates, poseId) => {
        axios.put(`/poses/${poseId}`, updates)
            .then(res => {
                setPoses(prevPoses => prevPoses.map (pose => pose._id !== poseId ? pose : res.data))
            })
            .catch(err => console.log(err))
    })

    const filterPose = (poses, query) => {
        if (!query) {
        }
    
        return poses.filter((pose) => {
            const poseName = pose.type;
            return poseName;
        });
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get("name");
    const filteredPose = filterPose(poses, query);

    useEffect(() => {
        getPoses();
    }, []);

    

    return (
        <div>
            <h1 
                className="title">Yoga Builder
                
            </h1>
           
            <AddYogaForm 
                submit={addPose}
                btnText="Add Pose"
            />
                { 
                poses.map(pose => {
                    return<Poses
                    {...pose} 
                    key={pose._id}
                    name={pose.name}
                    sanskirt={pose.sanskirt}
                    balancing={pose.balancing}
                    type={pose.type}
                    deleteBounty={deletePose}
                    editPose={editPose}
                    addPose={addPose}
                    
                    />}) 
}



<Search />
        
<ul className = "poseFiltered">
    {
    filteredPose.map(pose => {
return<Poses
{...pose} 
key={pose._id}
name={pose.name}
type={pose.type}

deletePose={deletePose}
editPose={editPose}
addPose={addPose}

/>})}
</ul>
</div>

)
}



export default App;
