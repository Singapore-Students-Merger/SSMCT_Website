'use client';

import React, { useState } from 'react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bondingImages = [
    '/path/to/image1.jpg', // Replace with real image paths
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
    '/path/to/image4.jpg',
    '/path/to/image5.jpg',
  ];

  const totalSlides = bondingImages.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="text-white min-h-screen px-6 py-8"
      style={{
        background: 'linear-gradient(180deg, #0F1B26 0%, #172D39 50%, #0F1B26 100%)',
        fontFamily: '"Century Gothic", sans-serif',
      }}
    >
      {/* Banner Section */}
      <div className="text-center mb-8">
        <div className="relative mb-4">
          <img
            src="/assets/20240728_103112.jpg"
            alt="Banner"
            className="w-full object-cover rounded-lg"
            style={{ height: '500px' }}  // Set the height to your desired value
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
            <img src="/assets/ssmlogo.png" alt="Logo" style={{ width: '300px', height: 'auto' }} />
            <h1
              className="text-2xl font-extrabold relative"
              style={{
                color: 'transparent',
                textStroke: '1px #5FB6D9',
                WebkitTextStroke: '1px #5FB6D9',
                textShadow: `
                  1px 1px 0 #FFFFFF,   
                  2px 2px 0 #FF9595,     
                  0 0 8px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              Gallery
            </h1>
            <button
              className="mt-4 px-6 py-2 font-bold rounded-full shadow-lg w-48"
              style={{
                backgroundColor: '#1E3D49',
                color: '#baeaff',
                border: '2px solid #baeaff',
                fontFamily: '"Century Gothic", sans-serif',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0px 6px 12px rgba(186, 234, 255, 0.8), 0px 0px 12px #baeaff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
              }}
            >
              Join Us
            </button>
          </div>
        </div>
      </div>

      {/* Bonding Sessions Section */}
      <section>
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
          Bonding Sessions
        </h2>
        <div className="relative w-full h-96 overflow-hidden">
          {/* Slide Container */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {bondingImages.map((image, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <img
                  src={image}
                  alt={`Bonding Session ${idx + 1}`}
                  className="h-96 w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4">
          {bondingImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full mx-1 ${
                idx === currentSlide ? 'bg-white' : 'bg-gray-500'
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* CTFs Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
          CTFs
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              src: '/assets/IMG_0093-Enhanced-NRe.jpg',
              title: 'YBN CTF 2024',
              date: '07/12/2024',
              description: 'SSM helped out YBN at YBN CTF 2024',
            },
            {
              src: '/assets/DSC09881 copy-topaz-sharpen-faceai-denoise.jpg',
              title: 'Greyhats Summit 2024',
              date: '26/06/2024',
              description: 'SSM Meetup at Greyhats Summit',
            },
            {
              src: '/assets/DSC_6311.JPG',
              title: 'Hack@AC',
              date: '15/08/2024',
              description: 'Many Members of SSM meeting up at Hack@AC',
            },
            {
              src: '/assets/20240728_103112.jpg',
              title: 'Grey Cat The Flag Finals 2024',
              date: '15/08/2024',
              description:
                'Taken at the 2024 Greyhats CTF, where SSM obtained 11th place overall',
            },
          ].map((image, idx) => (
            <div key={idx} className="relative group">
              <img
                src={image.src}
                alt={`CTF ${idx + 1}`}
                className="h-48 w-full object-cover rounded-lg shadow-md transition duration-300 group-hover:blur-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center opacity-0 transition duration-300 group-hover:opacity-100 rounded-lg">
                <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                <p className="text-white text-sm mb-1">{image.date}</p>
                <p className="text-white text-xs">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse All Section */}
<section className="mt-8">
  <h2 className="text-lg font-bold mb-4" style={{ fontFamily: '"Century Gothic", sans-serif' }}>
    Browse All
  </h2>
  <div className="grid grid-cols-3 gap-4">
    {[
      '/path/to/image1.jpg',
      '/path/to/image2.jpg',
      '/path/to/image3.jpg',
      '/path/to/image4.jpg',
      // Add more image paths here as needed
    ].map((src, idx) => (
      <img
        key={idx}
        src={src}
        alt={`Browse ${idx + 1}`}
        className="h-32 w-full object-cover rounded-lg shadow-md"
      />
    ))}
  </div>
</section>
    </div>
  );
};

export default Gallery;
