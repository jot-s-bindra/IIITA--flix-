// src/pages/Upload.jsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import UploadForm from '../components/UploadForm'
import { validateVideo, uploadToS3 } from '../components/VideoUploader'
import { getPresignedUrl } from '../services/uploadService'
import '../css/upload.css'
import '../css/global.css'

const Upload = () => {
  const { userId } = useParams()

  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

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
      const presignedUrl = await getPresignedUrl(title, file.type, userId)

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
    <>
      <UploadForm
        title={title}
        file={file}
        isUploading={isUploading}
        handleTitleChange={handleTitleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />

      {error && <p className="upload-error">{error}</p>}
      {message && <p className="upload-message">{message}</p>}
    </>
  )
}

export default Upload
