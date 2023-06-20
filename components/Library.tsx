"use client"




import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"

import MediaItem from "./MediaItem"
import { Song } from "@/types"
import useOnPlay from "@/hooks/useOnPlay"
import useSubscribeModal from "@/hooks/useSubscribeModal"
interface LibraryProps{
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({songs}) => {
  
  const authModal = useAuthModal();

    const {user, subscription}= useUser()
    const subscribeModal = useSubscribeModal();

    const onPlay = useOnPlay(songs);
    const uploadModal  = useUploadModal();
  const onClick =()=>{

            // we will use this to add songs
    if(!user){
        return authModal.onOpen()
    }

    // later will have subscription required
    if (!subscription) {
        return subscribeModal.onOpen();
      }

// only allows premium to upload music
        return uploadModal.onOpen();
// a screen to be able to add music

    }
  
    return ( 


        <div className="flex flex-col">
            
            
            <div className="flex items-center justify-between px-5 pt-4 ">


<div className="inline-flex items-center gap-x-2">



<TbPlaylist className="text-neutral-300" size={26} />
{/* our icon on second side bar */}

<p className="text-neutral-400 font-medium text-md">

    Your Library
</p>

</div>
<AiOutlinePlus onClick={onClick} size={20} className="text-neutral-400
cursor-pointer hover:text-white transition" />
{/* plus icon which adds more songs */}
{/* hover effects with transition */}

            </div>
            
<div className="flex flex-col gap-y-2 mt-4 px-3">
{/* write under our library label and shows our list */}


        {songs.map((item) => (
            <MediaItem
            onClick={(id:string)=> onPlay(id)}
            key={item.id}
            data={item}
            />

            // this will show our thing
        ))}

</div>



            </div>
     );
}
 
export default Library;