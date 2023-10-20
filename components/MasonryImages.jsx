"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ui/ImageCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryImages = ({ searchQuery }) => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomImages = async () => {
    try {
      let apiCall = "";

      if (searchQuery !== "") {
        apiCall = `https://api.unsplash.com/photos?page=1&query=${searchQuery}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
      } else {
        apiCall = `https://api.unsplash.com/photos/random?count=10&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
      }

      const res = await axios(apiCall);

      console.log(res?.data);
      setImages(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, [searchQuery]);

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
        <div className="hidden sm:block">
          <Masonry gutter="36px">
            {images &&
              images?.map((imageData, index) => (
                <ImageCard data={imageData} key={imageData.id} />
              ))}
          </Masonry>
        </div>
        <div className="block sm:hidden">
          <Masonry gutter="10px">
            {images &&
              images?.map((imageData, index) => (
                <ImageCard data={imageData} key={imageData.id} />
              ))}
          </Masonry>
        </div>
      </ResponsiveMasonry>
    </div>
  );
};

export default MasonryImages;
