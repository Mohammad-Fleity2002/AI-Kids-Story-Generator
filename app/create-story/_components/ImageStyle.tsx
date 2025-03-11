import React, { useState } from "react";
import Image from "next/image";

export interface optionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

function ImageStyle({ userSelection }: any) {
  const OptionList = [
    {
      label: "3D Cartoon",
      imageUrl: "/3D.png",
      isFree: true,
    },
    {
      label: "Paper Cut",
      imageUrl: "/paperCut.png",
      isFree: true,
    },
    {
      label: "Water Color",
      imageUrl: "/waterColor.png",
      isFree: true,
    },
    {
      label: "Pixel Style",
      imageUrl: "/pixel.png",
      isFree: true,
    },
  ];
  const [selectedOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: optionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "imageStyle",
    });
  };
  return (
    <div>
      <label className="font-bold text-4xl text-primary">4. Image Style</label>
      <div className="grid grid-cols-2 gap-5 mt-3">
        {OptionList.map((item: optionField, index) => (
          <div
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${
              selectedOption === item.label
                ? "grayscale-0 border rounded-3xl border-primary"
                : "grayscale"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h2 className="absolute bottom-5 text-white text-2xl text-center w-full">
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={500}
              className="object-cover h-[120px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStyle;
