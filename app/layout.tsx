import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsbyUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Explore Music!',
}

export const revalidate=0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>

        <ToasterProvider />
        {/*toaster is indepdent from anything so can add it  */}
        <SupabaseProvider>
          {/* we can now use our client supabase in our application */}


          <UserProvider>
            <ModalProvider products={products}/>
            {/* self closing and doesnt wrap */}

            {/* this now lets us check users and see if are logged in or not.  */}
        <Sidebar songs={userSongs} >
        {children}
        </Sidebar>

        <Player />
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
