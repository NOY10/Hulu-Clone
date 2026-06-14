import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import {forwardRef, useState} from 'react';

const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PSc5Jz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nOScgZmlsbD0nIzEyMjQyZicvPjwvc3ZnPg==";

const Thumbnail = forwardRef(({result, priority = false}, ref) => {
    const [imageError, setImageError] = useState(false);
    const BASE_URL = "https://image.tmdb.org/t/p/w780/";
    const imagePath = result.backdrop_path || result.poster_path;
    const title = result.title || result.original_name || "Untitled";
    const year = (result.release_date || result.first_air_date || "").slice(0, 4);
    const mediaType = result.media_type === "tv" ? "tv" : "movie";
  return (
    <Link href={`/details/${mediaType}/${result.id}`} passHref>
      <a ref={ref} className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#1ce783] focus:ring-offset-2 focus:ring-offset-[#07151d]">
        <div className="relative aspect-video overflow-hidden bg-[#12242f]">
          {imagePath && !imageError ? (
            <Image
              layout="fill"
              objectFit="cover"
              src={`${BASE_URL}${imagePath}`}
              alt={`${title} artwork`}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              onError={() => setImageError(true)}
              className="transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#17303a] to-[#07151d] text-sm font-semibold text-slate-500">
              Artwork unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081820] via-transparent to-transparent opacity-80" />
          {result.vote_average > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-[#1ce783] backdrop-blur">
              {result.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-clamp-1 text-xl font-bold text-white">{title}</h2>
            {year && <span className="pt-1 text-xs font-medium text-slate-500">{year}</span>}
          </div>
          <p className="text-clamp-2 mt-2 min-h-[2.5rem] text-sm leading-5 text-slate-400">
            {result.overview || "No overview is available for this title."}
          </p>
          <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>{result.media_type || "movie"}</span>
            <span className="mx-2 text-slate-700">/</span>
            <ThumbUpIcon className="mr-1 h-4 text-[#1ce783]" />
            <span>{result.vote_count || 0}</span>
          </div>
        </div>
      </a>
    </Link>
  )
})

Thumbnail.displayName = "Thumbnail";

export default Thumbnail
