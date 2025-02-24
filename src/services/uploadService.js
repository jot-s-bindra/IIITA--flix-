import axios from 'axios'

export const getPresignedUrl = async (title, fileType, userId) => {
  const response = await axios.post('http://3.105.163.2:5000/api/upload-url', { // <-- Added http://
    title,
    fileType,
    userId
  })
  return response.data.presignedUrl
}
