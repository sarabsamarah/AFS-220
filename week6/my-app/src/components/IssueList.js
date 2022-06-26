import React from 'react'
import Issue from './Issue'

export default function IssueList(props) {
  const { issues, comments, addComment, handleUpvote, handleDownvote, errMsg } = props

  return (
    <div className="issue-list">
      {issues.map(issue => 
        <Issue 
          {...issue} 
          key={issue._id} 
          comments={comments}
          addComment={addComment}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          errMsg={errMsg} />
      )}
    </div>
  )
}