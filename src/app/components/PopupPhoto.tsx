import React, { Dispatch, SetStateAction } from "react";
import { Photo } from "../../../types";

const PopupPhoto = ({
  componentProps,
  setShowPopUp,
}: {
  componentProps: Photo | null;
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center fixed left-0 top-0">
      <div className="bg-white w-1/2 py-2 flex justify-center items-center flex-col relative">
        <div className="w-1/2 my-5">
          <img
            src={componentProps?.urls.full}
            alt={componentProps?.alt_description}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <p>{componentProps?.description}</p>
        </div>
        <div
          onClick={() => setShowPopUp(false)}
          className="bg-red-500 text-white w-[20px] h-[20px] rounded-sm flex justify-center items-center p-1 absolute right-3 top-3"
        >
          <button>X</button>
        </div>
      </div>
    </div>
  );
};

export default PopupPhoto;
