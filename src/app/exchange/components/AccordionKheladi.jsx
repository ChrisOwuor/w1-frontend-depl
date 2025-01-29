

"use client";

import { Accordion } from "flowbite-react";

export default function AccordionKheladi ({ heading,text,color,textColor,bg }) {
  return (
    <Accordion collapseAll style={{borderStyle:"none"}} className="focus:border-b-0 w-full ring-0 focus:ring-0 focus:border-none border-gray focus:border-b-gray-2">
      <Accordion.Panel className="border-none focus:border-b-0 ring-none border-gray focus:ring-0 focus:border-b-gray-2 ">
        <Accordion.Title className={`bg-[${color}] border-none border-gray focus:border-b-gray-2 focus:ring-0 py-2 focus:border-none`}><p className={`text-${textColor}`}>
          {heading}</p></Accordion.Title>
        <Accordion.Content className={`text-left w-full text-black-2 p-[16px] focus:border-none`}>
          <table className={`border border-gray bg-[${bg}]  `}>
            <tbody className={` bg-[${bg}]  `}>

              {text.map((txt, index) => (<tr key={index} className="text-[15px] ">
                <td className="p-[5px]">{txt}</td>
              </tr>))}
            </tbody>

          </table>

        </Accordion.Content>
      </Accordion.Panel>

    </Accordion>
  );
}
