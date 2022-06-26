import React from 'react'
import Pose from './Pose'

export default function PoseList(props) {
  const { poses, comments, addComment, handleUpvote, handleDownvote, errMsg } = props

  return (
    <div className="pose-list">
      {poses.map(pose => 
        <Pose
          {...pose} 
          key={pose._id} 
          comments={comments}
          addComment={addComment}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          errMsg={errMsg} />
      )}
    </div>
  )
}