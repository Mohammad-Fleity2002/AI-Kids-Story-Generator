"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { StoryItemType } from "../dashboard/_components/UserStoryList";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@heroui/button";

function ExploreMore() {
  const [offset, setOffset] = useState(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);

  useEffect(() => {
    GetAllStories(0, true);
  }, []);

  const GetAllStories = async (newOffset: number, reset = false) => {
    console.log("Fetching stories with offset:", newOffset);
    const result: any = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(8)
      .offset(newOffset);

    setStoryList((prev) => (reset ? result : [...prev, ...result]));
    setOffset(newOffset + 8);
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center">
        Explore More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10">
        {storyList.length > 0 &&
          storyList.map((item, index) => (
            <StoryItemCard key={item.id || index} story={item} />
          ))}
      </div>
      <div className="text-center mt-10">
        <Button color="primary" onClick={() => GetAllStories(offset)}>
          Load More
        </Button>
      </div>
    </div>
  );
}

export default ExploreMore;
