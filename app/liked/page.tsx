



// liked page




import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";

import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

//   get our liked songs from our hook, now display them. 

// we display them through our liked content page. 

//  same as we did with search page. 
  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >

        {/* background styles and our header  */}
      <Header>
        <div className="mt-20">
          <div 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >

            {/* this header has our navigation and green at top */}
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">

                {/* has image type for our playlist, change our image later but have it the same name */}
              <Image
                className="object-cover"
                fill
                src="/images/liked.png"
                alt="Playlist"
              />

              {/* this puts the image on the top left side and then writes playlist and then songs underneath */}
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">
                Playlist

                {/* its our only playlist but valid.  */}
              </p>
              <h1 
                className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>

      {/* this displays our songs.  */}
      <LikedContent songs={songs} />
    </div>
  );
}

export default Liked;