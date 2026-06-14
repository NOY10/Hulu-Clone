import React from 'react'

function HeaderItem({title,Icon}) {
  return (
    <div className="group flex w-12 cursor-pointer flex-col items-center text-slate-400 transition hover:text-white sm:w-20">
        <Icon className="mb-1 h-6 transition duration-200 group-hover:-translate-y-1 sm:h-7" />
        <p className="text-[9px] font-semibold tracking-widest opacity-70 transition group-hover:opacity-100 sm:text-[10px]">{title}</p>

    </div>
  )
}

export default HeaderItem
