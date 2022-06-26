import React from 'react'
import Comment from './Comment'

function Comments(props) {
    const comments = props.comments.filter(comment => comment.issue === props._id)

    return (
        <div>
            {comments.map(comment => 
                <Comment 
                    key={comment._id}
                    comment={comment.comment} />
            )}
        </div>
    )
}

export default Comments