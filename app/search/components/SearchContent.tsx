"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface SearchContentProps {
  songs: Song[];
}

// displays list of songs. We add play and like functionality later. 

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
        <div 
            className="
            flex 
            flex-col 
            gap-y-2 
            w-full 
            px-6 
            text-neutral-400
            "
        >

{/* if no songs found with that name then we return none */}

        No songs found.
      </div>
    )
  }

  return ( 
            <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song: Song) => (

                // for each song make a div, with a certrain key, add the media item where the data is that song. 
                <div 
                key={song.id} 
                className="flex items-center gap-x-4 w-full"
                >
                <div className="flex-1">
                    <MediaItem 
                      onClick={(id: string) => onPlay(id)} 
                    data={song}
                    />
                </div>
{/* dont have to hit enter, it automatically re renders and finds the song with same name. */}

{/* write todo comments to find them later. */}
                
                <LikeButton songId={song.id} />
{/* like button is a heart. looks good */}
                {/* like a specific song.  */}

                {/*  */}
                </div>
            ))}
            </div>
  );
}
 
export default SearchContent;