const fs = require('fs').promises;
const axios = require('axios');
const FormData = require('form-data');

const uploadImages = async () => {
  const imageURLs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.png', '6.jpg'];

  for (let eventId = 1; eventId <= 39; eventId++) {
    // Determine the number of images to upload for this event
    const numImagesToUpload = Math.floor(Math.random() * 6) + 1;

    for (let i = 0; i < numImagesToUpload; i++) {
      // Randomly select an image
      const imageIndex = Math.floor(Math.random() * imageURLs.length);
      const imagePath = imageURLs[imageIndex];

      try {
        const image = await fs.readFile(imagePath);
        const formData = new FormData();
        formData.append('eventId', eventId);
        formData.append('image', image, imagePath);

        const response = await axios.post('http://localhost:3000/api/images', formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        console.log(`Event ID ${eventId}: Image uploaded successfully`, response.data);
      } catch (error) {
        console.error(`Event ID ${eventId}: Failed to upload image`, error.response?.data || error.message);
      }
    }
  }
};

uploadImages().then(() => console.log('Image upload process completed.'));
