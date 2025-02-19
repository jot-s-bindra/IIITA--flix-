// src/components/UploadForm.jsx
import React from 'react'

const UploadForm = ({
  title,
  file,
  isUploading,
  handleTitleChange,
  handleFileChange,
  handleSubmit
}) => {
  return (
    <div className="upload-container">
      <h1>Upload a Video</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div>
          <label>Video Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter video title"
          />
        </div>

        <div>
          <label>Select Video (MP4, max 15 mins):</label>
          <input type="file" accept="video/mp4" onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}

export default UploadForm
