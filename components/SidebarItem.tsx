




import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}


// this has each of our sidebar icons. We then return them. 

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    // this lets us use it as an icon. Remapping a prop to a different value lets us use it as a value
    label,
    active,
    href
  }) => {
    return ( 
      <Link
        href={href} 
        // has all our styles for left side bar icons. Can come back to this to change it. !!!!
        // tw merge lets us write all these styles without commas and other worries
        className={twMerge(`
          flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-4 
          text-md 
          font-medium
          cursor-pointer
          hover:text-white
          transition
          text-neutral-400
          py-1`,
          active && "text-white"

        //   makes the one weve clicked, white
          )
        }
      >
        
        <p className="truncate w-100">{label}</p>
        <Icon size={26} />


        {/* This writes the name of our icon to the side of it. Nice, Flip these for fun */}
      </Link>
     );
  }
  
  export default SidebarItem;