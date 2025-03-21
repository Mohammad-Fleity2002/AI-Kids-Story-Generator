"use client"
import React, { useEffect, useState } from "react";
import { HeroUIProvider} from "@heroui/react";
import { ToastContainer } from "react-toastify";
import { Users } from "@/config/schema";
import { db } from "@/config/db";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    user && saveNewUserIfNotExist();
  },[user])

  const saveNewUserIfNotExist = async () => {
    const userResp = await db.select().from(Users)
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''))

    console.log("Existing user:",userResp)
    if (!userResp[0]) {
      const result = await db
        .insert(Users)
        .values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          userName: user?.fullName,
        })
        .returning({
          userEmail:Users.userEmail,
          userImage:Users.userImage,
          userName:Users.userName,
          credit:Users.credit
        })
      console.log("new user:",result[0])
      setUserDetail(result[0]);
    } else {
      setUserDetail(userResp[0])
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
    <HeroUIProvider>
      {children}
      <ToastContainer />
    </HeroUIProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
