import React from 'react'
import '../uiverse.css'
function AddNew({ handleAddNew }) {
    return (
        <button onClick={handleAddNew} className='btn rounded-full'>
            New Jot
        </button>
    )
}

export default AddNew
