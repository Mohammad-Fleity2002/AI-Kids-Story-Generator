// 'use client'
// import React, { useState } from 'react'
// import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
// import Image from 'next/image';
// import path from 'path';
// import Link from 'next/link';
// import { Button } from '@heroui/button';
// function Header() {
//     const MenuList=[
//         {
//             name:'Home',
//             path:'/'
//         },
//         {
//             name:'Create Story',
//             path:'/create-story'
//         },
//         {
//             name:'Explore Stories',
//             path:'/explore'
//         },
//         {
//             name:'contact Us',
//             path:'/contact-us'
//         }
//     ]
//     const [isMenuOpen,setIsMenuOpen]=useState(false)
//   return (
//     <Navbar maxWidth='full' className='text-black' onMenuOpenChange={setIsMenuOpen}>
//         <NavbarContent>
//             <NavbarMenuToggle 
//             aria-label={isMenuOpen?"Close menu":"Open menu"}
//             className='sm:hidden'
//             />
//             <NavbarBrand>
//                 <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
//                 <h2 className='font-bold text-2xl text-primary ml-3'>Kidso Story</h2>
//             </NavbarBrand>
//         </NavbarContent>
//         <NavbarContent justify='center' className='hidden sm:flex'>
//             {
//                 MenuList.map(
//                     (item,index)=>(
//                         <NavbarItem className='text-xl text-primary font-medium hover:underline ml-2'>
//                             <Link href={item.path}>
//                             {item.name}
//                             </Link>
//                         </NavbarItem>
//                     )
//                 )
//             }
//         </NavbarContent>
//         <NavbarContent justify='end'>
//             <Button color='primary'>
//                 Get Started
//             </Button>
//         </NavbarContent>
//         <NavbarMenu className='text-primary' >
//             {
//                 MenuList.map(
//                     (item,index)=>(
//                         <NavbarItem>
//                             <Link href={item.path}>
//                             {item.name}
//                             </Link>
//                         </NavbarItem>
//                     )
//                 )
//             }
//         </NavbarMenu>
//     </Navbar>
//   )
// }

// export default Header
"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  const MenuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create Story",
      path: "/create-story",
    },
    {
      name: "Explore Stories",
      path: "/explore",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open Menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-2xl text-primary ml-3">Kids Story</h2>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {MenuList.map((item, index) => (
          <NavbarItem>
            <Link href={item.path} className="text-xl font-medium text-primary">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href={"/dashboard"}>
          <Button color="primary">
            {isSignedIn ? "Dashboard" : "Get Started"}
          </Button>
        </Link>
        <UserButton />
      </NavbarContent>
      <NavbarMenu>
        {MenuList.map((item, index) => (
          <NavbarMenuItem>
            <Link href={item.path}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
