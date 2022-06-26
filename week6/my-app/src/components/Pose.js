import React from 'react'
import AddComment from './AddComment'
import Comments from './Comments'

export default function Pose(props) {
  const { _id, title, description, votes, comments, addComment, handleUpvote, handleDownvote } = props

  return (
    <div className="pose">
      <h1>{ title } </h1>
      <h2>Votes:{ votes }</h2>
      <h3>{ description }</h3>
      <div className='vote-btns'>
        <button
            onClick={() => handleUpvote(props._id)}>
            Up-Vote
        </button>
        <button
            onClick={() => handleDownvote(props._id)}>
            Down-Vote
        </button>
      </div>
      <div>
        <AddComment 
          _id={props._id}
          addComment={addComment} />
      </div>
      <div>
        <Comments 
          _id={_id}
          comments={comments} />
      </div>
    </div>
  )
}