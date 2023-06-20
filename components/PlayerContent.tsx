"use client"


import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";


interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ 
  song, 
  songUrl
}) => {
// this will control volume, play/pause etc. 
    
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
// gets our player and volume

  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
// if volume =0, then do mute mark
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    // if there is an array of songs, get the next one
    // if its a solo song then return. 

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    // if there is no next song. then get the first song. 
// otherwise get next
    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
// basically same exact as next, but go backwords. 
// we choose previous song by -1, if there is no previous, the we get the last song. 

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const [play, { pause, sound }] = useSound(
    songUrl,
    { 

        // destructure our play, sound and pause and set them. Give our sound our songurl. 
        // we give it a volume and our format so it changes. 
        // our song url only changes dynamically cuz of the key. smart. 
        // very simple. if play then play, at end then go to next. 
        // pause then pause
        // format has to be mp3 or wont hear. 
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  useEffect(() => {
    // automatically play song when it loads
    sound?.play();
    
    return () => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {

    // if its not playing then play, otherwise pause it. 
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  const toggleMute = () => {
    // if its muted then make it 1. otherwise make it 0
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  return ( 
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            {/* picture */}
            {/* this will give the bottom our icon and name. 
            // even has like functionality in bottom bar. 
            */}
            <LikeButton songId={song.id} />
          </div>
        </div>

        <div 
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
        >
                    {/* only on mobile.  */}

          <div 
            onClick={handlePlay} 
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />

            {/* component  This is our pause/play button it uses a usestate and ? */}
          </div>
        </div>

        <div 
// this is for our desktop view. Not on Mobile. 

          className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
        >

            {/* adds our play/prev button. also has back/forward button */}
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
          <div 
            onClick={handlePlay} 
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />

{/* this is our play button */}

          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            " 
          />
{/* forward arrow. */}

        </div>


                {/* volume slider, nice.  */}
        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon 
              onClick={toggleMute} 
              className="cursor-pointer" 
              size={34} 
            />
            {/* has our volume value, we can also mute it easily  */}
            <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
// this lets it change dynamically. 
            //   just for volume. 
            />
          </div>
        </div>

      </div>
   );
}
 
export default PlayerContent;