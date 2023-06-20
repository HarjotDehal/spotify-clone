"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}


// very quickly adds new songs when we add them. 




const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
}) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

    // this is our image we get by passing in our data

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

//   default which we do later
    return player.setId(data.id);
  };

  return ( 
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >

        {/* styling our media item so it looks nice on left side */}


        {/* shows the picture icon alongwith the song name. very ncie */}
      <div 
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >

        {/* this same image as the cover. nice  */}
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">

        {/* writes name of song followed by author */}
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">
          By {data.author}
        </p>
      </div>
    </div>
  );
}
 


export default MediaItem;