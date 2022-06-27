import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '', 
        poses: JSON.parse(localStorage.getItem('poses')) || [],
        allPoses: JSON.parse(localStorage.getItem('allPoses')) || [],
        comments: JSON.parse(localStorage.getItem('comments')) || [],
        username: '',
        errMsg: ''
    }
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                getUserPoses()
                getAllPoses()
                getComments()
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('poses')
        localStorage.removeItem('allPoses')
        localStorage.removeItem('comments')
        setUserState({
            user: {},
            token: '',
            poses: [],
            getAllPoses: [],
            comments: []
        })
    }

    function handleAlreadyVoted(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAlreadyVoted() {
        setUserState(prevState => ({
            ...prevState, 
            errMsg: ''
        }))
    }

    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState, 
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState, 
            errMsg: ''
        }))
    }

    function getUserPoses() {
        resetAlreadyVoted()

        userAxios.get("/api/poses/user")
        .then(res => {
            console.log(res)
            localStorage.setItem('poses', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                poses: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllPoses() {
        resetAlreadyVoted()

        userAxios.get("/api/poses")
        .then(res => {
            localStorage.setItem('allPoses', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                allPoses: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addPose(newPose) {
        resetAlreadyVoted()

        userAxios.post('/api/poses', newPose)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState, 
                    poses: [...prevState.poses, res.data],
                    allPoses: [...prevState.allPoses, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getComments() {
        userAxios.get('/api/comments')
            .then(res => {
                console.log("what is going on", res.data)
                localStorage.setItem('comments', JSON.stringify(res.data))

                setUserState(prevState => ({
                    ...prevState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(id, newComment) {
        userAxios.post(`/api/comments/add/${id}`, newComment)
        .then(res => {
            getComments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function handleUpvote(id) {
        userAxios.get(`/api/poses/upvote/${id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    handleAlreadyVoted('You already voted on this pose')
                } else {
                    resetAlreadyVoted()

                    userAxios.put(`/api/poses/upvote/${id}`)
                        .then(res => {
                            setUserState(prevState => ({
                                ...prevState, 
                                poses: [...prevState.poses.map(pose => pose._id !== id ? pose : res.data)],
                                allPoses: [...prevState.allPoses.map(pose => pose._id !== id ? pose : res.data)]
                            }))
                            
                        })
                        .catch(err => console.log(err.response.data.errMsg))
                    userAxios.post(`/api/poses/vote/${id}`)
                        .catch(err => console.log(err.response.data.errMsg))
                    }
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function handleDownvote(id) {
        userAxios.get(`/api/poses/upvote/${id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    handleAlreadyVoted('You already voted on this pose')
                } else {
                    resetAlreadyVoted()
                    
                    userAxios.put(`/api/poses/downvote/${id}`)
                        .then(res => {
                            setUserState(prevState => ({
                                ...prevState, 
                                poses: [...prevState.poses.map(pose => pose._id !== id ? pose : res.data)],
                                allPoses: [...prevState.allPoses.map(pose => pose._id !== id ? pose : res.data)]
                            }))
                            
                        })
                        .catch(err => console.log(err.response.data.errMsg))
                    userAxios.post(`/api/poses/vote/${id}`)
                        .catch(err => console.log(err.response.data.errMsg))
                    }
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


    return (
        <UserContext.Provider
            value={{
                ...userState, 
                signup,
                login,
                logout,
                addPose,
                addComment,
                resetAuthErr,
                handleUpvote,
                handleDownvote,
                resetAlreadyVoted
            }}>
            { props.children }
        </UserContext.Provider>
    )
}