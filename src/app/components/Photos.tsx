"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Photo } from "../../../types";
import fetchPhotos from "../../../lib/FetchPhotos";
import PhotoComponent from "./PhotoComponent";
import PopupPhoto from "./PopupPhoto";

const Photos = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [componentProps, setComponentProps] = useState<null | Photo>(null);

  // this hook use object observer to observe an html element to indicate whather its on the screen or not by attaching the ref on the last element
  const { ref, inView } = useInView();

  // infinite query give use useful params to indicate whether you fetch more or is loading etc..
  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = 100;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  // Each time those params changes and the last div is in view, that means we are at the end of the photos, so fetch more photos
  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView]);

  // If its loading the first fetch
  if (isLoading) return;

  return (
    <div className="flex justify-center items-center flex-wrap">
      {data?.pages.map((page: { data: Photo[] }) => {
        return page.data.map((photo: Photo, i: number) => {
          // if we got the last element attach ref to it
          if (page.data.length === i + 1) {
            return (
              <PhotoComponent
                key={photo.id}
                photo={photo}
                ref={ref}
                setComponentProps={setComponentProps}
                setShowPopUp={setShowPopUp}
              />
            );
          } else {
            return (
              <PhotoComponent
                key={photo.id}
                photo={photo}
                setComponentProps={setComponentProps}
                setShowPopUp={setShowPopUp}
              />
            );
          }
        });
      })}

      {/* If its Fetching New Data On Scroll Show Loading */}
      {isFetching && isFetchingNextPage ? <div>Loading More Pages..</div> : ""}
      {showPopUp ? (
        <PopupPhoto
          componentProps={componentProps}
          setShowPopUp={setShowPopUp}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Photos;
