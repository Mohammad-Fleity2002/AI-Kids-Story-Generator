"use client";
import React, { useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@heroui/button";
import { chatSession } from "@/config/GeminiAi";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import axios from "axios"
import { useRouter } from "next/navigation";
// @ts-ignore
import Router from "next/router";
import uuid4 from "uuid4";
// import { writeFile } from "fs";
import CustomLoader from "./_components/CustomLoader";
import { writeFile } from 'node:fs/promises';
// import { toast } from "@heroui/theme";
import { useUser } from "@clerk/nextjs";
import {ToastContainer, toast} from 'react-toastify';


const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  
  const notify=(msg:string)=>toast(msg);
  const notifyError=(msg:string)=> toast.error(msg);
  const {user}=useUser();
  // const SaveInDB = async (output: string) => {
  //   const recordId = uuid4();
  //   setLoading(true);
  //   try {
  //     const result = await db
  //       .insert(StoryData)
  //       .values({
  //         storyId: recordId,
  //         ageGroup: formData?.ageGroup,
  //         imageStyle: formData?.imageStyle,
  //         storySubject: formData?.storySubject,
  //         storyType: formData?.storyType,
  //         output: JSON.parse(output),
  //       })
  //       .returning({ storyId: StoryData?.storyId });
  //     setLoading(false);
  //     return result;
  //   } catch (e) {
  //     setLoading(false);
  //   }
  // };

  const SaveInDB = async (output: string, coverImage: string) => {
    const recordId = uuid4();
    setLoading(true);
    try {
        const result = await db
            .insert(StoryData)
            .values({
                storyId: recordId,
                ageGroup: formData?.ageGroup,
                imageStyle: formData?.imageStyle,
                storySubject: formData?.storySubject,
                storyType: formData?.storyType,
                output: JSON.parse(output),
                coverImage: coverImage, // Save the image filename
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                userName: user?.fullName
              })
            .returning({ storyId: StoryData?.storyId });
        setLoading(false);
        return result;
    } catch (e) {
        setLoading(false);
    }
  };
  const router = useRouter(); // Initialize the router
  const GenerateStory = async () => {
    setLoading(true);
    const Final_PROMPT = CREATE_STORY_PROMPT?.replace(
        "{ageGroup}",
        formData?.ageGroup ?? ""
    )
    .replace("{storyType}", formData?.storyType ?? "")
    .replace("{storySubject}", formData?.storySubject ?? "")
    .replace("{imageStyle}", formData?.imageStyle ?? "");

    try {
        const result = await chatSession.sendMessage(Final_PROMPT);
        const story = JSON.parse(result?.response.text());

        const imageResp = await axios.post('/api/generate-image', {
            prompt: "Add text with title: " + story?.title + " in bold text for book cover, " + story.cover.image_prompt,
            title: story?.title // Pass the title to the API
        });

        // Log the image URL and filename
        console.log("Generated Image URL:", imageResp.data.imageUrl);
        console.log("Generated Image Filename:", imageResp.data.imageFilename);

        // Save the story and image filename to the database
        const resp = await SaveInDB(result?.response.text(), imageResp.data.imageUrl);
        toast('Story Generated')
        // console.log(resp);
        // Redirect to the view-story page with the newly created story ID
        if (resp && resp[0]?.storyId) {
            router.replace(`/view-story/${resp[0].storyId}`);
        } else {
            console.error("Failed to retrieve story ID from the database response.");
        }

        setLoading(false);
    } catch (e) {
        console.log(e);
        notifyError("error try again");
        setLoading(false);
    }
};
//   const GenerateStory = async () => {
//     setLoading(true);
//     const Final_PROMPT = CREATE_STORY_PROMPT?.replace(
//         "{ageGroup}",
//         formData?.ageGroup ?? ""
//     )
//     .replace("{storyType}", formData?.storyType ?? "")
//     .replace("{storySubject}", formData?.storySubject ?? "")
//     .replace("{imageStyle}", formData?.imageStyle ?? "");

//     try {
//         const result = await chatSession.sendMessage(Final_PROMPT);
//         const story = JSON.parse(result?.response.text());

//         const imageResp = await axios.post('/api/generate-image', {
//             prompt: "Add text with title: " + story?.title + " in bold text for book cover, " + story.cover.image_prompt,
//             title: story?.title // Pass the title to the API
//         });

//         // Log the image URL to ensure it's being received correctly
//         console.log("Generated Image URL:", imageResp.data.imageUrl);

//         // Display the image in your frontend
//         const imageElement = document.createElement('img');
//         imageElement.src = imageResp.data.imageUrl;
//         document.body.appendChild(imageElement); // Or append it to a specific container

//         // Save the story and image URL to the database
//         const resp = await SaveInDB(result?.response.text());
//         console.log(resp);

//         setLoading(false);
//     } catch (e) {
//         console.log(e);
//         setLoading(false);
//     }
// }; 
 // const GenerateStory = async () => {
  //   setLoading(true);
  //   const Final_PROMPT = CREATE_STORY_PROMPT?.replace(
  //     "{ageGroup}",
  //     formData?.ageGroup ?? ""
  //   )
  //   .replace("{storyType}", formData?.storyType ?? "")
  //   .replace("{storySubject}", formData?.storySubject ?? "")
  //   .replace("{imageStyle}", formData?.imageStyle ?? "");
  //   try {
  //     const result = await chatSession.sendMessage(Final_PROMPT);
  //     const story=JSON.parse(result?.response.text());
  //     const imageResp= await axios.post('/api/generate-image',{
  //       prompt:"Add text with title: "+story?.title+" in bold text for bool cover, "+story.cover.image_prompt
  //     })
  //     // console.log(story.title);
  //     writeFile('./output.png',imageResp.data)
  //     console.log(imageResp.data.imageUrl)
  //     console.log(story?.title)
  //     // console.log(story?.cover?.image_prompt)
  //     // // console.log(result?.response.text());
  //     // const resp = await SaveInDB(result?.response.text());
  //     // console.log(resp);
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //     setLoading(false);
  //   }
  // };
  const onHandleUserSelection = (data: fieldData) => {
    // notify("choice selected")
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    })
  )

console.log(data)};
  return (
    <div  className="p-10 bg-[#ccd3ff] md:px-20 lg:px-40">
     <h2 className="font-extrabold text-[70px] text-primary text-center">
         CREATE YOUR STORY
       </h2>
       <p className="text-2xl text-primary text-center">
         Unlock your creativity with AI: Craft stories like never before! <br />
         Let our AI bring your imagination to life, one story at a time
       </p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
         <StorySubjectInput userSelection={onHandleUserSelection} />
         <StoryType userSelection={onHandleUserSelection} />
         <AgeGroup userSelection={onHandleUserSelection} />
         <ImageStyle userSelection={onHandleUserSelection} />
       </div>
       <div className="flex justify-end my-10">
         <Button
          color="primary"
          disabled={loading}
          className="p-10 text-2xl"
          onClick={GenerateStory}
        >
          Generate Story
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
</div>
  )
}

export default CreateStory