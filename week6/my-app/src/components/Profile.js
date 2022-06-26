import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueList from '../components/IssueList'

export default function Profile() {
  const { user, issues, comments, addComment, handleUpvote, handleDownvote, resetAlreadyVoted, errMsg } = useContext(UserContext)

  useEffect(() => {
    resetAlreadyVoted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="profile">
      <h1>Welcome {`${user.firstname} ${user.lastname}`}</h1>
      <h3>Your Issues:</h3>
      <p className='err-msg'>{errMsg}</p>
      <IssueList 
        issues={issues} 
        comments={comments}
        addComment={addComment}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        errMsg={errMsg} />
    </div>
  )
}
