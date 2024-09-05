import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-slate-800 flex flex-col h-36 text-white justify-center items-center bottom-0'>
      <div className='logo text-white'>
        <span className='text-green-700 text-2xl font-bold'>&lt;</span>
        <span className='text-2xl font-bold'>Pass</span>
        <span className='text-green-700 text-2xl font-bold'>OP</span>
        <span className='text-green-700 text-2xl font-bold'>/&gt;</span>
      </div>
      <span className='text-lg font-bold'>&lt;Copyright © Niman Bhattarai/&gt;</span>
    </div>
  )
}

export default Footer