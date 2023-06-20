"use client"

// our main sidebar 
// our sidebar is dynamic so we make it client. 
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
// import Library from "./Library";
import { useMemo } from "react";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(() => [
    {

        // this is our list of pages essentially, its our label
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/'

    //   href points to our home page
    },
    {
      icon: BiSearch,
      label: 'Search',
      href: '/search',
      active: pathname === '/search'
    },
  ], [pathname]);

  return (
    // <div>Sidebar</div>
    <div 
      className={twMerge(`
        flex 
        h-full
        `,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
{/* this has a object and if player is active then put it right above it. Makes sense. it adjusts when it comes out */}

    {/* sidebar shows up on desktop, hidden on small.  */}
      <div 
        className="
          hidden 
          md:flex 
          flex-col 
          gap-y-2 
          bg-black 
          h-full 
          w-[300px] 
          p-2
        "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>

          {/* this has our icons essentially which each have buttons to do things */}
        </Box>
                                {/* has our list of sidebar items.  */}

        <Box className="overflow-y-auto h-full">

                        {/* this fills the entire left side with a background subsection essentially */}

          <Library songs={songs}  />

{/* this has our list of songs */}

        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">

        {/* this is our main content section to the side. it then goes out of this section and does stuff there.  */}
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;