import { EditorProps } from "@/lib/types";
import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PaletteIcon } from "lucide-react";
import { usePremiumStore } from "@/hooks/usePremiumDialog";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  const { subscriptionLevel ,setIsOpen} = usePremiumStore();

  const enableButton = subscriptionLevel === "pro_plus";

  const handleClick = ()=>{
    if(enableButton){
      setShowPopover(true)
    }
    else{
      setIsOpen(true)
    }
  }

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleClick}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
