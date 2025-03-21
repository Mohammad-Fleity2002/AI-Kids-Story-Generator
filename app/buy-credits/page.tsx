"use client";
import { Button } from "@heroui/button";
import React, { useState } from "react";

function BuyCredits() {
  const options = [
    {
      id: 1,
      price: 1.99,
      credits: 10,
    },
    {
      id: 2,
      price: 2.99,
      credits: 20,
    },
    {
      id: 3,
      price: 5.99,
      credits: 75,
    },
    {
      id: 4,
      price: 9.99,
      credits: 150,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<number>();

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40 text-center">
      <h2 className="text-4xl font-bold text-primary">Add More Credits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {options.map((option, index) => (
            <div
              className={`p-6 my-3 border bg-primary text-center rounded-lg text-white cursor-pointer hover:scale-105 transition-all ${
                selectedOption === option.id ? "bg-violet-900" : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <h2>
                Get {option.credits} Credits= {option.credits} Story
              </h2>
              <h2 className="font-bold text-2xl">${option.price}</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-screen">
          <Button color="danger" className="p-10 text-2xl">
            Buy Credits
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BuyCredits;
