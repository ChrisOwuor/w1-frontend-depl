import React from 'react'
import { Loader } from "@mantine/core";

const Loading = ({ stylings, globalSettings }) => {
  return (
    <div className={`flex justify-center items-center ${stylings || ""}`}>
      <Loader color="text-primary" type="dots" size={20} />
      {
        globalSettings ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${globalSettings?.businessLogo || "uploads/betlogo.png"}`} alt="profile" className="w-26 h-full object-contain" /> :
          <p className="text-2xl md:text-xl font-bold">
            <span className="text-black">loading..</span>
          </p>
      }

    </div>
  )
}

export default Loading