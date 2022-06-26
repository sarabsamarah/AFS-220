import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from '../components/IssueForm'
import IssueList from '../components/IssueList'

export default function Issues() {
  const { addIssue, allIssues, comments, addComment, handleUpvote, handleDownvote, resetAlreadyVoted, errMsg } = useContext(UserContext)

  useEffect(() => {
    resetAlreadyVoted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="issues">
      <IssueForm addIssue={addIssue} />
      <h3>All Issues</h3>
      <p className='err-msg'>{errMsg}</p>
      <IssueList 
        issues={allIssues} 
        comments={comments}
        addComment={addComment}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote} />
    </div>
  )
}