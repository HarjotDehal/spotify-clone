"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import PlayButton from "./PlayButton";
import LikeButton from "./LikeButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick
}) => {
// get the data and our onclick for our song item. if its clicked we will have different styles then if not. 

  const imagePath = useLoadImage(data);

  return ( 
    <div
      onClick={() => onClick(data.id)} 
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/20 
        transition 
        p-3
      "
    >

        {/* adds cool styles essentially to the boxes.  */}
      <div 
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">

        {/* this makes space for us for each card. */}
        <p className="font-semibold truncate w-full">

            {/* writes name of our song. Change this style later if i want.  */}
          {data.title}
        </p>
        <p 
            className="
                text-neutral-400 
                text-sm 
                pb-4 
                w-full 
                truncate
            "
            >
            {data.author}
            </p>
        </div>
        <div 
            className="
            absolute 
            bottom-24 
            right-5
            "
      >
        <PlayButton />
        {/* <LikeButton songId={song.id} /> */}

        {/* allows each of our songs to be played */}
      </div>
    </div>
   );
}
 
export default SongItem;