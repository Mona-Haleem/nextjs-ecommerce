import React from "react";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { findUserById } from "@/lib/data/user";

export default async function UserData() {
  const session = await auth();
  const userId = session!.user?.id;
 
  
  const user = await findUserById(userId!);
  return (
    <div className="text-center p-4">
      <div className="flex items-center justify-center p-10">
        <div>
          <Image
            className="w-36 h-36 mb-4 rounded-full object-cover"
            src={user?.image ||"/avatar.png" }
            alt="User Profile Picture"
            width={144}
            height={144}
          />

         
        </div>

        <div className="ml-12 text-left">
          <p className="text-lg mb-6">
            <span className="font-bold">Name: </span>
            {user?.username || "N/A"}
          </p>
          <p className="text-lg mb-6">
            <span className="font-bold">Email: </span>
            {user?.email || "N/A"}
          </p>
          {/* <p className="text-lg mb-6">
            <span className="font-bold">Phone Number: </span>
            {user?.phoneNumber || "N/A"}
          </p> */}
        </div>
      </div>
    </div>
  );
}
