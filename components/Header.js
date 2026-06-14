import HeaderItem from "./HeaderItem"
import {BadgeCheckIcon,CollectionIcon,HomeIcon, LightningBoltIcon, SearchIcon, UserIcon,} from '@heroicons/react/outline'

function Header() {
  return (
    <header className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-5 px-5 py-6 sm:flex-row sm:px-8 lg:px-12">
        <div className="order-2 flex w-full max-w-2xl flex-grow justify-evenly sm:order-1 sm:w-auto">
            <HeaderItem title='HOME' Icon={HomeIcon}/>
            <HeaderItem title='TRENDING' Icon={LightningBoltIcon}/>
            <HeaderItem title='VERIFIED' Icon={BadgeCheckIcon}/>
            <HeaderItem title='COLLECTIONS' Icon={CollectionIcon}/>
            <HeaderItem title='SEARCH' Icon={SearchIcon}/>
            <HeaderItem title='ACCOUNT' Icon={UserIcon}/>
        </div>
        <div className="order-1 flex items-center gap-2 sm:order-2" aria-label="Hulu home">
          <span className="text-4xl font-black tracking-tighter text-[#1ce783]">hulu</span>
          <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white/70">CLONE</span>
        </div>
        
    </header>
  )
}

export default Header
