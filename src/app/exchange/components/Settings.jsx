import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { EditPassword } from 'src/app/auth/EditPassword'
import { EditStakeButtons } from '@/app/components/settings/StakeButtonsSettings'

const SettingsComponent = () => {
  const searchParams = useSearchParams()
  const pg = searchParams.get("tb")


  return (
    <div className='flex flex-col w-full'>
      <div className="flex gap-x-2 items-center bg_1 p-1 rounded">
        <Link
          href="?pg=settings&tb=password"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "password" && "bg-gray-500"} p-1 cursor-pointer`}>Password</h4>
        </Link>
        <Link
          href="?pg=settings&tb=stakeButtons"
        >
          <h4 className={`font-bold rounded text-sm text-gray-200 ${pg === "stateButtons" && "bg-gray-500"} p-1 cursor-pointer`}>Stake Buttons</h4>
        </Link>

      </div>



      {
        pg === "password" && (
          <div className="flex w-full">
            <EditPassword />
          </div>
        )
      }


      {
        pg === "stakeButtons" && (
          <div className="flex w-full">
            <EditStakeButtons />
          </div>
        )
      }
    </div>
  )
}

export default SettingsComponent