import React from 'react'
import {FaPlayCircle } from "react-icons/fa"
function StoryPages({storyChapter}:any) {
  const playSpeech=(text:string)=>{
    // const voice
    const synth=window?.speechSynthesis;
    const textToSpeech=new SpeechSynthesisUtterance(text);
    synth.speak(textToSpeech)
  }
    return (
    <div>
        <h2 className='text-2xl font-bold text-primary'>{storyChapter?.chapter_title} <span className='text-3xl cursor-pointer 'onClick={()=>playSpeech(storyChapter?.story)}><FaPlayCircle />
        </span></h2>
        <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100'>{storyChapter?.story}</p>
    </div>
  )
}

export default StoryPages