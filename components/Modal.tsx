



//  we will use radix for this. It supports modal and non-modal modes. It has a escape key which closes something. 
// its basically something for design. makes it easier 
import * as Dialog from '@radix-ui/react-dialog';


// close button
import { IoMdClose } from 'react-icons/io';

interface ModalProps {

    // this is a tab/screen which opens/closes. Probably something for our login
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return ( 
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>

{/* it has a open abilitiy, get these values from previous caller */}
{/* it is a pop up screen when you click something. Its probably when we click on screen for a song. Makes sense tho */}

      <Dialog.Portal>
        <Dialog.Overlay 
          className="
            bg-neutral-900/90 
            backdrop-blur-sm 
            fixed 
            inset-0
          " 
        />

        {/* this overlay is behind our text */}
        <Dialog.Content
          className="
            fixed 
            drop-shadow-md 
            border 
            border-neutral-700 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-auto 
            md:max-h-[85vh] 
            w-full 
            md:w-[90vw] 
            md:max-w-[450px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            bg-neutral-800 
            p-[25px] 
            focus:outline-none
          ">

            {/* this is for the inside box which houses our text */}
          <Dialog.Title 
            className="
              text-xl 
              text-center 
              font-bold 
              mb-4
            "
          >
            {title}
            {/* our title which we passed thru */}

          </Dialog.Title>
          <Dialog.Description 
            className="
              mb-5 
              text-sm 
              leading-normal 
              text-center
            "
          >

            {/* styles for our description, we can change this later if i want.  */}
            Login to your account. <br /> Demo Email : harjotdehal@hotmail.com <br /> Password : password123 <br /> Create new account to view swipe integration or click on top right to go to our account page after signing in.
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>

            {/* the top and right 10 puts it in the top right */}
            <button
              className="
                text-neutral-400 
                hover:text-white 
                absolute 
                top-[10px] 
                right-[10px] 
                inline-flex 
                h-[25px] 
                w-[25px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
                focus:outline-none
                animate-pulse
              "
            //   hovering changes color a lil bit too. Can make it animation too
              aria-label="Close"
            >
              <IoMdClose />
              {/* this shows up in top right corner.  */}
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
 
export default Modal;