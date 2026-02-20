import { v2 as cloudinary } from 'cloudinary'
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
 
export default cloudinary
 
export function getOptimizedImageUrl(publicId: string, width = 800) {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_${width},q_auto,f_auto/${publicId}`
}
