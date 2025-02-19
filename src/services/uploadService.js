// src/services/uploadService.js
import axios from 'axios'

// Request Pre-signed URL from Upload Service
export const getPresignedUrl = async (title, fileType, userId) => {
  const response = await axios.post('http://localhost:5000/api/upload-url', {
    title,
    fileType,
    userId
  })
  return response.data.presignedUrl
}
