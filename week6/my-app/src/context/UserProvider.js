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
        issues: JSON.parse(localStorage.getItem('issues')) || [],
        allIssues: JSON.parse(localStorage.getItem('allIssues')) || [],
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

                getUserIssues()
                getAllIssues()
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
        localStorage.removeItem('issues')
        localStorage.removeItem('allIssues')
        localStorage.removeItem('comments')
        setUserState({
            user: {},
            token: '',
            issues: [],
            allIssues: [],
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

    function getUserIssues() {
        resetAlreadyVoted()

        userAxios.get("/api/issues/user")
        .then(res => {
            localStorage.setItem('issues', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllIssues() {
        resetAlreadyVoted()

        userAxios.get("/api/issues")
        .then(res => {
            localStorage.setItem('allIssues', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                allIssues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newIssue) {
        resetAlreadyVoted()

        userAxios.post('/api/issues', newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState, 
                    issues: [...prevState.issues, res.data],
                    allIssues: [...prevState.allIssues, res.data]
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
        userAxios.get(`/api/issues/upvote/${id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    handleAlreadyVoted('You already voted on this issue')
                } else {
                    resetAlreadyVoted()

                    userAxios.put(`/api/issues/upvote/${id}`)
                        .then(res => {
                            setUserState(prevState => ({
                                ...prevState, 
                                issues: [...prevState.issues.map(issue => issue._id !== id ? issue : res.data)],
                                allIssues: [...prevState.allIssues.map(issue => issue._id !== id ? issue : res.data)]
                            }))
                            
                        })
                        .catch(err => console.log(err.response.data.errMsg))
                    userAxios.post(`/api/issues/vote/${id}`)
                        .catch(err => console.log(err.response.data.errMsg))
                    }
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function handleDownvote(id) {
        userAxios.get(`/api/issues/upvote/${id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    handleAlreadyVoted('You already voted on this issue')
                } else {
                    resetAlreadyVoted()
                    
                    userAxios.put(`/api/issues/downvote/${id}`)
                        .then(res => {
                            setUserState(prevState => ({
                                ...prevState, 
                                issues: [...prevState.issues.map(issue => issue._id !== id ? issue : res.data)],
                                allIssues: [...prevState.allIssues.map(issue => issue._id !== id ? issue : res.data)]
                            }))
                            
                        })
                        .catch(err => console.log(err.response.data.errMsg))
                    userAxios.post(`/api/issues/vote/${id}`)
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
                addIssue,
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