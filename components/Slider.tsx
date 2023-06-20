"use client";

import * as RadixSlider from '@radix-ui/react-slider';
// this gets our slider. radix gives us good looking icons. 

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
}


const Slider: React.FC<SlideProps> = ({ 
  value = 1, 
  onChange
}) => {
  
//   value begins at one which is max volume
  
    const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return ( 
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
      "
    //   icon styling. 
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >

      <RadixSlider.Track 
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
      >
        {/* tracks our volume, has a range inside of it. Track is our ------.  range makes it full and bigger */}
        <RadixSlider.Range 
          className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          " 
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
 
export default Slider;