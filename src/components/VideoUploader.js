// src/components/VideoUploader.js
import axios from 'axios'

// Validate video duration (≤ 15 minutes)
export const validateVideo = (file) => {
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

// Upload video to AWS S3 using the Pre-signed URL
export const uploadToS3 = async (file, presignedUrl) => {
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
