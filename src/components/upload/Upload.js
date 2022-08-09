import React from 'react';

const Upload = () => {
    return (
        <div className='upload'>
            <div className='upload-container'>
                <label for="formFileLg" class="form-label">Large file input example</label>
                <input class="form-control form-control-lg" id="formFileLg" type="file" />
            </div>
        </div>
    );
};

export default Upload;