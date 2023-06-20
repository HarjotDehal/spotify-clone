import Header from '@/components/Header'
import Image from 'next/image'
// import getSongs from "@/actions/getSongs";
// import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from '@/actions/getSongs';
export const revalidate = 0;

import PageContent from "./components/PageContent";
export default async function Home() {
  
  // throw new Error('test')
  
  const songs = await getSongs();
  
  return (
   

    <div className=' bg-neutral-900 h-full rounded-lg w-full overflow-hidden overflow-y-auto'>


<Header>
{/* this is our header stuff on right side of our main page.  */}
  

{/* add divs and h1 elements */}

<div className="mb-2">
          <h1 
            className="
            text-white 
              text-3xl 
              font-semibold
            ">
              Welcome back
          </h1>

          {/* main statement */}
          <div 
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
          >
            <ListItem 
              name="Liked Songs" 
              image="/images/liked.png" 
              href="liked" 
            />

            {/* change the size of it later */}
          </div>
        </div>


</Header>
     
<div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">

            Newest songs

            {/* basically a explore page. Shows new songs. Change wording and other stuff later if i want.  */}
          </h1>
        </div>
        <PageContent songs={songs} />
        {/* List of Songs! */}

{/* {songs.map((song) => <div>{song.title} </div>)} */}


        {/* now make authentications..  */}

      </div>
      </div>



  )
}
