import React from "react";
import { auth } from "@/lib/auth";
import { fetchUserData } from "@/lib/api";



export default async function UserData() {
  const session = await auth();
  const userId = session!.user.id;
  console.log("User ID:", session?.user);
  const user = await fetchUserData(userId);
  return (
   
          <div className="text-center p-4">
            <div className="flex items-center justify-center p-10">
              <div>
                <img
                  className="w-36 h-36 mb-4 rounded-full object-cover"
                  src={user.image}
                  alt="User Profile Picture"
                />{" "}
                <h2 className="text-2xl font-semibold">{user.username || user?.name}</h2>
              </div>

              <div className="ml-12 text-left">
                <p className="text-lg mb-6">
                  <span className="font-bold">Name: </span>
                  {user?.name || "N/A"}
                </p>
                <p className="text-lg mb-6">
                  <span className="font-bold">Email: </span>
                  {user.email|| "N/A"}
                </p>
                <p className="text-lg mb-6">
                  <span className="font-bold">Phone Number: </span>
                  {user.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
      
     
  );
}
