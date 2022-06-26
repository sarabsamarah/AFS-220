import React from 'react'



  
function Comment(props) {
    console.log(props)
    return (
        <div>
            {props.comment}
        </div>
    )
}

export default Comment
