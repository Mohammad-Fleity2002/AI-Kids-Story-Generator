import React from 'react'
import Image from 'next/image'
import { Button } from '@heroui/button'
import Link from 'next/link'
function Hero() {
  return (
    <div className='px-9 md:px-25 lg:px-40 mt-9 h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h2 className='text-[50px] text-primary font-extrabold py-10'>Craft Magical Stories for Kids in Minutes</h2>
          <p className='text-xl text-primary font-light'>
            
create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and Magic School, give me 5 chapter, With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format
          </p>
          <Link href={'/create-story'}>
          <Button size='lg' color='primary'
          className='mt-5 font-bold text-xl p-5'> Create a Story</Button>
          </Link>
        </div>
        <div className='h-400'>
          <Image src={'/hero.png'} alt='hero' width={700} height={200}/>
        </div>
      </div>
    </div>
  )
}

export default Hero