
"use client";

import { Accordion } from "flowbite-react";

export default function OurSponsorshipAccodion ({ heading,text,color,textColor,bg }) {
  return (
      <Accordion collapseAll style={{ borderStyle: "none" }} className="focus:border-b-0 ring-0 focus:ring-0 focus:border-none border-gray focus:border-b-gray-2">
          <Accordion.Panel className="border-none focus:border-b-0 ring-none border-gray focus:ring-0 focus:border-b-gray-2 ">
        <Accordion.Title className={`bg-[${color}] focus:ring-0 py-2 border-0`}><p className={`text-${textColor}`}>
          {heading}</p></Accordion.Title>
              <Accordion.Content className={`text-left text-[11px] text-[#3a3a3a] p-[16px] bg-[#dbcdeb]`}>
                  {
                      text.map((text, index) => (
                          <div key={index} className="text-[#3a3a3a] space-y-2 mb-2">
                              <h6 className="text-center">{text.h1}</h6>
                              <h6 className="text-center">{text.h2}</h6>
                              <p>{text.text}</p>
                          </div>
                      ))
          }

        </Accordion.Content>
      </Accordion.Panel>

    </Accordion>
  );
}
