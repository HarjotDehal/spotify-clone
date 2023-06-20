

"use client"
// interactive/ changes


import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import mypic from '@/public/images/liked.png'

// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href,
}) => {
  const router = useRouter();
    
  const onClick = () => {

        // only allows it for users. 

    // if (!user) {
    //   return authModal.onOpen();
    // }

    router.push(href);
  };

  
  return ( 


<button
      onClick={onClick}
    //   play the song
      className="
        relative 
        group 
        flex 
        items-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-100/10 
        cursor-pointer 
        hover:bg-emerald-700
        transition 
        pr-4
      "
    >

        {/* has our liked song list. It does not stretch everything.   */}
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image

        // we will find a picture later. Get a heart picture. 

        // change the picture later to have a background so its nicer. 
          className="object-cover"
          src={mypic}
          fill
          alt="Image"
        />
      </div>
      <p className="font-medium truncate py-5">

        {/* not sure what this name is for but probbaly ours.  */}
        {name}
      </p>
      <div 
        className="
          absolute 
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-green-500 
          p-4 
          drop-shadow-md 
          right-5
          group-hover:opacity-100 
          hover:scale-110
        "
        // right-5 is not really absolute here. Interesting uses the div boundaries. remember that. group is our parent element. 

        // Since it is a child, we can use right-5 to move it exactly where we want.
      >
        <FaPlay className="text-black" />

        

        {/* play icon to play music probably.  This only shows up when we hover. Change the background of it later. green background looks bad */}
      </div>
    </button>




     );
}
 
export default ListItem;