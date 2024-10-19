import { CasinoContext } from '@/app/context/CasinoContext'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import React, { useContext } from 'react'

const CasinoNotifications = () => {
  const { message } = useContext(CasinoContext)
  return (
    <div className='bg-white mx-auto mt-10 px-4 py-2 rounded-lg flex items-center gap-x-2'>

      {
        message == "Bet placed successfully" ?
          <CheckCircleRoundedIcon className='text-success font-bold' fontSize='medium' />
          :
          <ErrorRoundedIcon className='text-danger font-bold' fontSize='medium' />
      }
      <p className='text-black text-sm sm:text-lg font-bold'>{message}</p>
    </div>
  )
}

export default CasinoNotifications