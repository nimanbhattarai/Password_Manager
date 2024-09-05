import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 flex justify-around items-center text-white h-20'>
            <div className='logo text-white'>
                <span className='text-green-700 text-2xl font-bold'>&lt;</span>
                <span className='text-2xl font-bold'>Pass</span>
                <span className='text-green-700 text-2xl font-bold'>OP</span>
                <span className='text-green-700 text-2xl font-bold'>/&gt;</span>

            </div>
            <a href="https://github.com/nimanbhattarai" target='_blank'>
                <button className='text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full flex gap-4 items-center justify-center w-40'>
                    <img className='invert w-12 ' src="/icons/github.svg" alt="github" />
                    <span className='font-bold text-lg'>Github</span>
                </button>
            </a>
        </nav>
    )
}

export default Navbar