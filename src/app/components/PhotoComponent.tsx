import React, { Dispatch, SetStateAction } from "react";
import { Photo } from "../../../types";

type PhotoComponentProps = {
  photo: Photo;
  setComponentProps: Dispatch<SetStateAction<null | Photo>>;
  setShowPopUp: Dispatch<SetStateAction<boolean>>;
};
const PhotoComponent = React.forwardRef(
  (
    { photo, setComponentProps, setShowPopUp }: PhotoComponentProps,
    ref: any
  ) => {
    // If we got ref, attack it to the div
    if (ref) {
      return (
        <div
          ref={ref}
          key={photo.id}
          className="w-[30%] mx-5 my-1 aspect-auto cursor-pointer"
          onClick={() => {
            setComponentProps(photo);
            setShowPopUp(true);
          }}
        >
          <img
            src={photo.urls.small_s3}
            alt={photo.alt_description}
            className="object-contain"
            loading="lazy"
          />
        </div>
      );
    }
    // if we dont get ref return div without ref
    else {
      return (
        <div
          key={photo.id}
          className="w-[30%] mx-5 my-1 aspect-auto cursor-pointer"
          onClick={() => {
            setComponentProps(photo);
            setShowPopUp(true);
          }}
        >
          <img
            src={photo.urls.small_s3}
            alt={photo.alt_description}
            className="object-contain"
            loading="lazy"
          />
        </div>
      );
    }
  }
);

PhotoComponent.displayName = "PhotoComponent";

export default PhotoComponent;
