import React from 'react'
import { Loader } from "@mantine/core";

const Loading = ({ stylings, globalSettings }) => {
  return (
    <div className={`flex justify-center items-center ${stylings || ""}`}>
      <Loader color="text-white" type="dots" size={20} />
      {
        globalSettings ?     <p className="text-2xl md:text-xl font-bold">
        <span className="text-black">LOADING ...</span>
      </p> :
      ""
      }

    </div>
  )
}

export default Loading