import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import PoseForm from './PoseForm'
import PoseList from './PoseList'

export default function Poses() {
  const { addPose, allPoses, comments, addComment, handleUpvote, handleDownvote, resetAlreadyVoted, errMsg } = useContext(UserContext)

  useEffect(() => {
    resetAlreadyVoted()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="poses">
      <PoseForm addPose={addPose} />
      <h3>Yoga Poses</h3>
      <p className='err-msg'>{errMsg}</p>
      <PoseList 
        poses={allPoses} 
        comments={comments}
        addComment={addComment}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote} />
    </div>
  )
}