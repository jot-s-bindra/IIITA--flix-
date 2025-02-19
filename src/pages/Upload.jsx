// src/pages/Upload.jsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/upload.css'
import '../css/global.css'

const Upload = () => {
  const { userId } = useParams()

  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const validateVideo = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.src = URL.createObjectURL(file)

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src)
        const duration = video.duration / 60
        duration <= 15 ? resolve(true) : reject('Video duration exceeds 15 minutes.')
      }

      video.onerror = () => reject('Invalid video file.')
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    if (selectedFile.type !== 'video/mp4') {
      setError('Only MP4 files are allowed.')
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError('')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const uploadToS3 = async (file, presignedUrl) => {
    try {
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      })
      return true
    } catch (err) {
      throw new Error('Error uploading to S3')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || !title) {
      setError('Please select a video and enter a title.')
      return
    }

    setIsUploading(true)
    setError('')
    setMessage('Checking video duration...')

    try {
      await validateVideo(file)
      setMessage('Video check passed. Preparing upload...')

      setMessage('Getting upload permission...')
      const response = await axios.post('http://localhost:5000/api/upload-url', {
        title,
        fileType: file.type,
        userId
      })

      const { presignedUrl } = response.data

      // Upload the Video to S3
      setMessage('Uploading video to server...')
      await uploadToS3(file, presignedUrl)

      setMessage(`Success! Video "${title}" has been uploaded. 🎉`)
      setFile(null)
      setTitle('')
    } catch (err) {
      setError(err.message || 'Error uploading video')
    } finally {
      setIsUploading(false)
    }
  }

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

      {error && <p className="upload-error">{error}</p>}
      {message && <p className="upload-message">{message}</p>}
    </div>
  )
}

export default Upload
