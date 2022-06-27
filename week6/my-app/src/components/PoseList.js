import React from 'react'
import Pose from './Pose.js'

export default function PoseList(props) {
  const { poses, comments, addComment, handleUpvote, handleDownvote, errMsg } = props
console.log(poses)
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

// const PoseList = (props) => {
//   const { poses } = props
//   return (
//     <div className="pose-list">
//       { poses.map(issue => <Pose {...pose} key={pose._id}/>) }
//     </div>
//   )
// }

// export default List;