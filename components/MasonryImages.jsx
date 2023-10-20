"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ui/ImageCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryImages = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomImages = async () => {
    try {
      const res = await axios(
        `https://api.unsplash.com/photos/random?count=20&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
      );

      console.log(res?.data);
      setImages(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  if (isLoading) {
    return (
      <div className="px-7 sm:px-[10rem] py-10 w-full h-full bg-white dark:bg-[#232323] flex flex-col items-center">
        <p className="text-lg sm:text-2xl font-bold text-[#A7A7A7] dark:text-white text-center">
          Loading some awesome Images...
        </p>
      </div>
    );
  }

  return (
    <div className="px-7 sm:px-[10rem] py-10 w-full h-full bg-white dark:bg-[#232323]">
      <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 350: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images &&
            images?.map((imageData, index) => (
              <ImageCard data={imageData} key={imageData.id} />
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default MasonryImages;
