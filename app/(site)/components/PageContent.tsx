"use client";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "@/components/SongItem";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);
// lets us play

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs available.
      </div>
    )
    // if no songs then say no songs. 
  }

  return ( 
    <div 
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
    >
      {songs.map((item) => (
        <SongItem 
          onClick={(id: string) => onPlay(id)} 
          key={item.id} 
          data={item}
        />
      ))}
{/* clicking opens player */}

{/* this maps all our songs, will add play functionality later.  */}
{/* create a song item, which is essentially a specific card for each of our songs. we create that in components */}

    </div>
  );
}
 
export default PageContent;