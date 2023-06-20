import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";


import musicplayer from '@/public/images/purepng.com-music-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596085b6osz.png'
import Image from "next/image";



// this displays our account information. 


// has our account settings and we want to check our subscription. 

const Account = () => {
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
      <Header className="from-bg-neutral-900">

  


        <div className="mb-2 flex  gap-y-6">
        <Image className=' animate-bounce w-16 mr-4' src={musicplayer} alt="" />
            {/* this will have similar settings to search.  */}

          <h1 className="text-white text-6xl font-semibold mb-8">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  )
}

export default Account;