import { useRouter } from "next/router";
import requests from "../utils/requests"

function Nav() {
    const router = useRouter();
    const activeGenre = router.query.genre || "fetchTrending";
  return (
    <nav className="sticky top-0 z-40 border-y border-white/5 bg-[#07151d]/90 py-4 backdrop-blur-xl">
        <div className='mx-auto flex max-w-[1600px] gap-3 overflow-x-auto px-5 scrollbar-hide sm:px-8 lg:px-12'>
            {Object.entries(requests).map(([key, {title,url}]) => (
                <button key={key}
                type="button"
                onClick={() => router.push(`/?genre=${key}`)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeGenre === key
                    ? "bg-[#1ce783] text-[#071b16] shadow-lg shadow-[#1ce783]/10"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}>{title}</button>
            ))}
        </div>
    </nav>
  )
}

export default Nav
