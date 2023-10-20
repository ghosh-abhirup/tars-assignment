import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Tag from "./Tag";
import axios from "axios";
import InstagramIcon from "@mui/icons-material/Instagram";
import { smallerRepresentation } from "@/constants/numberShortener";

const DetailsPopup = ({ id, isDialogOpen, onClose }) => {
  const [imageData, setImageData] = useState(null);

  const fetchSpecificImageData = async () => {
    try {
      const { data: res } = await axios.get(
        `https://api.unsplash.com/photos/${id}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
      );

      setImageData(res);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchSpecificImageData();
  }, [id]);

  return (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className={`relative z-20`}>
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-[950px] w-[80%] sm:w-[60%] rounded-[8px] overflow-hidden bg-white dark:bg-[#232323] flex flex-col shadow-lg">
            <img
              src={imageData?.urls.raw}
              className="h-[300px] sm:h-[400px]  bg-contain mx-auto"
              alt="full img"
            />
            <div className="flex-1 bg-white dark:bg-[#232323] p-5 sm:p-6 flex-col justify-between">
              <div className="flex justify-between items-center">
                {/* User details */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-[46px] sm:w-[56px] h-[46px] sm:h-[56px] overflow-hidden">
                      <img
                        src={imageData?.user.profile_image.large}
                        className="w-full h-full bg-contain"
                        alt="user logo"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-black dark:text-white font-bold text-[12px] sm:text-[14px] truncate w-[100%]">
                        {imageData?.user.name}
                      </p>
                      <p className="text-[#A7A7A7] font-semibold italic text-[9px] sm:text-[12px] truncate">
                        @{imageData?.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {imageData?.user.social.instagram_username && (
                      <div className="flex items-center gap-[1px]">
                        <InstagramIcon className="text-[#A7A7A7] w-3 sm:w-5 h-3 sm:h-5 cursor-pointer" />
                        <p className="font-semibold text-[9px] sm:text-[12px] text-[#A7A7A7]">
                          /{imageData?.user.social.instagram_username}
                        </p>
                      </div>
                    )}
                    {imageData?.user.social.twitter_username && (
                      <div className="flex items-center gap-[1px]">
                        <InstagramIcon className="text-[#A7A7A7] w-3 sm:w-5 h-3 sm:h-5 cursor-pointer" />
                        <p className="font-semibold text-[9px] sm:text-[12px] text-[#A7A7A7]">
                          /{imageData?.user.social.twitter_username}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Download and like */}
                <div>
                  <div className="block sm:hidden mb-2">
                    <button>Download</button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-[8px] sm:text-[14px] text-[#4F4F4F] dark:text-[#E5E5E5]">
                      {smallerRepresentation(imageData?.downloads)} downloads
                    </p>

                    <div className="flex gap-[4px] items-center">
                      <ThumbUpOutlinedIcon className="dark:text-white w-3 sm:w-5 h-3 sm:h-5 cursor-pointer" />
                      <p className="font-bold text-[8px] sm:text-[14px] text-[#4F4F4F] dark:text-[#E5E5E5]">
                        {imageData?.likes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-[12px] text-[#4F4F4F] dark:text-white">
                  Related Tags
                </p>
                <div className="flex flex-wrap items-center mt-2 sm:mt-2.5 gap-2 sm:gap-3">
                  {imageData &&
                    imageData?.tags?.map((tag, index) => (
                      <Tag data={tag.title} key={index} />
                    ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsPopup;
