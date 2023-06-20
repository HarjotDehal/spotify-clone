"use client";






import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

//   isloading shows if its loaded or not yet
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();

//   need this so it says who uploaded something
  const { user } = useUser();
  const router = useRouter();



//   this gives default values inside our form
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });




  const onChange = (open: boolean) => {
    if (!open) {


        // we reset our form and close our modal
    //   reset();
      uploadModal.onClose();
    }
  }


//   const onSubmit =() =>{}
// const onSubmit: SubmitHandler<FieldValues> = async (values) => {}
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      
      const imageFile = values.image?.[0];

    //   our first image element, same for song

      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing properties')
        return;
      }
            // if something isnt there then we dont let it thru, give an error. toast so doenst crash. have to return to stop

      const uniqueID = uniqid();

    //   this safely stores and gives unique ids. 

      // Upload song
      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });
        // upsert means to update and insert. makes sense

        // upload song from songs. go to stongs storage. have to wait for superbase client to do it.
        // we choose songs bucket, 

        

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload');
        // this breaks entire function
      }

      // Upload image and put it in image bucket. only if song was successful
      const { 
        data: imageData, 
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      
      // Create record 

    //   this records the thing in our database. it takes from the bucket and adds to the database. 
    // therefore we can use it easier when extracting
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        });

      if (supabaseError) {
        // setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      
      router.refresh();
    //   resets page so you can see the new song. 
      setIsLoading(false);
      toast.success('Song added!');
      reset();
    //   resets our form and closes modal. 
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
        {/* we create a form which takes in information for our songs.  */}
        {/* we wrap our onsubmit inside handle submit so that we can give values through our onsubmit. Values given thru form */}

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-y-6"

        // this is the gap between each input inside our form
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song Title"
        />
{/* register is from use form, we destructure it. Then we get title from the register. True means it must have it. Spreads a bunch of stuff like title onchage, name etc.   */}


            {/* id and register must be the same so that it works.  */}
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register('song', { required: true })}
          />
          {/* this makes it only accept mp3s. Nothing else. it only allows us in the  */}
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
          
        </div>
        <Button disabled={isLoading} type="submit">
            {/* this submits our form.  */}
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;