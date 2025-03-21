import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-[70px] text-primary font-extrabold">
            Craft Magical Stories for kids in Minutes
          </h2>
          <p className="text-2xl text-primary font-light">
            Create fun and personalised stories that bring your child's
            adventures to life and spark their passion for reading. It only
            takes a few seconds!
          </p>
          <Link href={"/create-story"}>
            <Button size="lg" color="primary" className="mt-5">
              Create Story
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/hero.png"} alt="hero" width={700} height={400} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
