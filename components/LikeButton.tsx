"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);
        // this checks whether the user has liked a song or not. 
        // doesnt matter if someone else liked the song


  useEffect(() => {
    if (!user?.id) {
      return;
    }
    // if there is no user id with ours then break. 
  

        // try and find a song in liked song table with id we passed

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    }


    fetchData();
  }, [songId, supabaseClient, user?.id]);




  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

//   if we like or not, it has a heart or empty heart. 



  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    // this ensures that if we are not logged in and try to like, it opens authentication model. 

    if (isLiked) {
        // if already liked, then delete from table and unlike. 
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {

        // here we insert it into the table. Above we deleted if it was already liked. 
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Song Liked!');
      }
    }

    router.refresh();
    // refreshes our page
  }

  return (
    <button 
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
        animate-bounce
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />

      {/* changes color of our heart if we like it or not. cool, can make them animate */}
    </button>
  );
}

export default LikeButton;