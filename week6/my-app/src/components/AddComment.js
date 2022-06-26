import React, {useState } from 'react'
//import { UserContext } from '../context/UserProvider'


function AddComment(props) {

    const initInput = {
        comment: ''
    }

    const [input, setInput] = useState(initInput)
    const { _id, addComment } = props

    function handleChange(e) {
        const { name, value } = e.target

        setInput(prevInput => ({ ...prevInput, [name]: value }))
    }

    function handleSave() {
        addComment(_id, input)
        setInput(initInput)
    }

    return (
        <div className='add-comment-form'>
            <textarea
                type='text'
                name='comment'
                value={input.comment}
                onChange={handleChange}
                placeholder='Comments' />
            <button onClick={handleSave}>
                Add Comment
            </button>
        </div>
    )
}

export default AddComment