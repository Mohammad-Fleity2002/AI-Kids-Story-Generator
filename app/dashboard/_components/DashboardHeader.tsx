"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@heroui/button";
import Link from "next/link";

function DashboardHeader() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="font-bold text-3xl">My Stories</h2>
      <div className="flex gap-3 items-center">
        <Image src={"/coin.png"} alt="coin" width={50} height={50} />
        <span className="test-2xl">{userDetail?.credit} Credit Left</span>
        <Link href={'/buy-credits'}>
          <Button className="bg-indigo-400" color="secondary">
            Buy More Credits
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
