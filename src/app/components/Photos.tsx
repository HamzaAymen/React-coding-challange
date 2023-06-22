"use client";

import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Photo } from "../../../types";
import fetchPhotos from "../../../lib/FetchPhotos";

const Photos = () => {
  const { ref, inView } = useInView();

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

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView]);

  if (isLoading) return;

  return (
    <div className="flex justify-center items-center flex-wrap">
      {data?.pages.map((page: { data: Photo[] }) => {
        return page.data.map((photo: Photo, i: number) => {
          if (page.data.length === i + 1) {
            return (
              <div
                key={photo.id}
                ref={ref}
                className="w-[30%] mx-5 my-1 aspect-auto cursor-pointer"
              >
                <img
                  src={photo.urls.small_s3}
                  alt={photo.alt_description}
                  className="object-contain"
                />
              </div>
            );
          } else {
            return (
              <div
                key={photo.id}
                className="w-[30%] mx-5 my-1 aspect-auto cursor-pointer"
              >
                <img
                  src={photo.urls.small_s3}
                  alt={photo.alt_description}
                  className="object-contain"
                />
              </div>
            );
          }
        });
      })}
      {isFetching && isFetchingNextPage ? <div>Loading More Pages..</div> : ""}
    </div>
  );
};

export default Photos;

// return (
//   {data.pages.map((page:any) => {
//   return <>
//   {page.data.map((photo:Photo,i:number) => {
//     if(page.length === i + 1) {
//       return <div ref={ref} className="w-[30%] aspect-auto my-1 mx-1 cursor-pointer">
//       <img
//         src={photo.urls.small_s3}
//         alt={photo.alt_description}
//         className="object-contain"
//       />
//     </div>
//     }
//     else {
//       return <div className="w-[30%] aspect-auto my-1 mx-1 cursor-pointer">
//       <img
//         src={photo.urls.small_s3}
//         alt={photo.alt_description}
//         className="object-contain"
//       />
//     </div>
//     }

//   })}
//   </>
// })}
//   )
