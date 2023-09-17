import React from 'react';
import AddNew from './AddNew';

const SearchBar = ({ handleSearch, handleAddNew }) => {
    return (
        <div className='flex justify-center m-5'>
            <input onChange={handleSearch} type='text' className='mr-5 w-96 px-2 py-1 border border-gray-300 rounded-full' placeholder='Search...'></input>
            <AddNew handleAddNew={handleAddNew} />
        </div>
    );
}

export default SearchBar;
