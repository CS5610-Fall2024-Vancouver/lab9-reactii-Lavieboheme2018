import React, { useEffect, useState } from 'react';

const FetchDogImage = () => {
  const [dogImage, setDogImage] = useState(null);

  // useEffect to run fetchDogImage
  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        setDogImage(data.message); 
      } catch (error) {
        console.error('Error fetching the dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <div>
      <h2>Random Dog Image</h2>
      {/* Display the image if dogImage has a value */}
      {dogImage ? <img src={dogImage} alt="Random Dog" /> : <p>Loading...</p>}
    </div>
  );
};

export default FetchDogImage;