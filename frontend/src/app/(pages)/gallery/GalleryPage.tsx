'use client';

import GradientBg from '@/components/GradientBg';
import Hero from '@/components/Hero';
import React, { useState } from 'react';
import { Gallery as GalleryComponent, Info } from '@/components/Gallery';
import { Carousel } from '@/components/Carousel';
import Popup from '@/components/Popup';
import Image from 'next/image';

interface GalleryPageProps {
  data: Info[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<Info | null>(null);
  const ctfs = data.filter((item) => item.category === 'CTF');
  const bonding = data.filter((item) => item.category === 'Bonding');

  return (
    <>
      <div>
        {/* Banner Section */}
        <Hero title="Gallery" bgImage="/backgrounds/gallery.png" />

        {/* Bonding Sessions Section */}
        <GradientBg className="py-8 w-full" gradientPosition="y-center">
          <section>
            <h2
              className="text-3xl font-bold mb-4 lg:mb-12 px-4"
              style={{ fontFamily: '"Century Gothic", sans-serif' }}
            >
              Bonding Sessions
            </h2>
            <Carousel data={bonding} setSelectedImage={setSelectedImage} />
          </section>
        </GradientBg>

        {/* CTFs Section */}
        <GradientBg className="py-8 mt-8 w-full" gradientPosition="y-center">
          <section>
            <h2
              className="text-3xl font-bold mb-4 lg:mb-12 px-4"
              style={{ fontFamily: '"Century Gothic", sans-serif' }}
            >
              CTFs
            </h2>
            <Carousel data={ctfs} setSelectedImage={setSelectedImage} />
          </section>
        </GradientBg>

        {/* Browse All Section */}
        <div className="py-8 px-4 mt-8">
          <section className="mt-8">
            <h2
              className="text-3xl font-bold mb-4 lg:mb-12"
              style={{ fontFamily: '"Century Gothic", sans-serif' }}
            >
              Browse All
            </h2>
            <GalleryComponent data={data} setSelectedImage={setSelectedImage} />
          </section>
        </div>
      </div>
      {/* Popup */}
      {selectedImage && (
        <Popup onClose={() => setSelectedImage(null)}>
          <div>
            <h2 className="text-4xl text-white font-bold">{selectedImage.title}</h2>
          </div>
          <Image
          className='my-4 w-[90vw] md:w-[35rem] max-w-none'
            src={selectedImage.src}
            alt={selectedImage.title}
            width={1000}
            height={600}
          />
          <div>
            <p className="font-bold">{selectedImage.date}</p>
            <p className="text-white text-xl">{selectedImage.description}</p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default GalleryPage;
