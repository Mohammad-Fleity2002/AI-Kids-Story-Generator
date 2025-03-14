"use client"
import { useParams } from 'next/navigation';
import {db} from '@/config/db'
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import HTMLFlipBook from  'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import ChapterPage from '../_components/ChaptePag';
import StoryPages from '../_components/StoryPages';
import LastPage from '../_components/LastPage';
import { Button } from '@heroui/button';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";


export default function ViewStory({params}:any) {
    const [count,setCount]=useState(0);
    const [story,setStory]=useState<any>();
    const bookRef=useRef();
    useEffect(()=>{
        console.log(params.storyId);
        getStory();
    })
    const getStory=async()=>{
        const result=await db.select().from(StoryData).where(eq(StoryData.storyId,params.storyId));
        console.log(result[0]);
        setStory(result[0]);
    }
    // const params = useParams();
    // const storyId = params.storyId; // Access the storyId from the URL
    // const getStory = async (storyId: any) => {
    //     try {
    //         const result = await db
    //             .select()
    //             .from(StoryData)
    //             .where(eq(StoryData.storyId, storyId)); // Use storyId, not params.id
    
    //         if (result.length > 0) {
    //             console.log(result[0]); // Log the first matching record
    //             return result[0]; // Return the first matching record
    //         } else {
    //             console.log("No story found with the given ID.");
    //             return null; // Return null if no record is found
    //         }
    //     } catch (error) {
    //         console.error("Error fetching story:", error);
    //         throw error; // Re-throw the error for handling elsewhere
    //     }
    // };
    getStory();
    // const imgURL=`/public/images/${story?.coverImage}`;
    console.log(story?.output?.chapters)
    return (
        <div className="p-10 bg-[#ccd3ff] md:px-20 lg:px-40 ">
            <h2 className="font-bold text-4xl text-center p-10 bg-primary text-white">
                {story?.output?.title}
            </h2>
              <div className='relative'>
              {/* @ts-ignore */}
              <HTMLFlipBook
                key={story?.storyId} // Force re-render when story changes
                width={500}
                height={500}
                showCover={true}
                className="mt-10"
                useMouseEvents={false}
                ref={bookRef}
                >
                {/* Cover Page */}
                <div key="cover">
                    <BookCoverPage imageUrl={story?.coverImage} />
                </div>

                {/* Chapters */}
                {
                    [...Array(story?.output?.chapters?.length)].map((item,index)=>(
                        <div key={index} className='bg-white p-10 border'>
                             <StoryPages storyChapter={story?.output?.chapters[index]}/>
                         </div>
                     ))
                    }
                {/* Chapters */}
                {/* {story?.output?.chapters?.map((chapter: any, index: number) => (
                    <div key={index} className="bg-white p-10 border">
                    </div>
                    ))} */}

                {/* Last Page */}
                    {/* <div><LastPage/></div> */}
                <div key="last-page">
                    <LastPage />
                </div>
            </HTMLFlipBook>
{ count!=(story?.output?.chapters?.length-1) &&           <div className='absolute -right-7 top-[250px]' onClick={()=>{
                bookRef.current.pageFlip().flipNext();
                setCount(count+1);
            
            }}>
                    <IoIosArrowDroprightCircle className='text-4xl text-primary cursor-pointer'/>
                    {/* <Button>NEXT</Button> */}
                </div>}                
                {count!=0 &&<div className='absolute -left-7 top-[250px]'
                onClick={()=>{
                    bookRef.current.pageFlip().flipPrev();
                    setCount(count-1);
                
                }} >
                    <IoIosArrowDropleftCircle 
                    className='text-4xl text-primary cursor-pointer'
                    />
                    {/* <Button>NEXT</Button> */}
                </div>}
                    </div>
        </div>
    );
            // <HTMLFlipBook width={500} height={500} showCover={true} className='mt-10'>
            //         {/* Cover Page */}
            //     <div key="cover">
            //         <BookCoverPage  imageUrl={story?.coverImage} />
            //     </div>
            //     {
            //         [...Array(story?.output?.chapters?.length)].map((item,index)=>(
            //             <div key={index} className='bg-white p-10 border'>
            //                 <StoryPages storyChapter={story?.output?.chapters[index]}/>
            //                 {/* <h2>{index}</h2> */}
            //             </div>
            //         ))
            //     }
            //     <div key="last page">
            //         <LastPage/>
            //     </div>
            // </HTMLFlipBook>
}