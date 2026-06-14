import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, StarIcon } from "@heroicons/react/outline";
import Header from "../../../components/Header";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PSc5Jz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nOScgZmlsbD0nIzEyMjQyZicvPjwvc3ZnPg==";

export default function Details({ details, type, error }) {
  const title = details?.title || details?.name || "Title details";
  const releaseDate = details?.release_date || details?.first_air_date;
  const runtime = details?.runtime || details?.episode_run_time?.[0];

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>{title} | Hulu Clone</title>
        <meta name="description" content={details?.overview || `Details for ${title}`} />
      </Head>

      <Header />

      {error ? (
        <main className="mx-auto max-w-xl px-6 py-20 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl">
            <h1 className="text-2xl font-bold text-white">Details unavailable</h1>
            <p className="mt-3 leading-7 text-slate-400">{error}</p>
            <Link href="/">
              <a className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1ce783] px-6 py-3 font-semibold text-[#071b16]">
                <ArrowLeftIcon className="h-5 w-5" /> Back to browse
              </a>
            </Link>
          </div>
        </main>
      ) : (
        <main className="relative">
          {details.backdrop_path && (
            <div className="absolute inset-x-0 top-0 h-[68vh] min-h-[560px] overflow-hidden">
              <Image
                src={`${IMAGE_BASE_URL}${details.backdrop_path}`}
                alt=""
                layout="fill"
                objectFit="cover"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07151d] via-[#07151d]/80 to-[#07151d]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07151d] via-transparent to-[#07151d]/30" />
            </div>
          )}

          <section className="relative mx-auto grid min-h-[68vh] max-w-[1500px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[280px_1fr] lg:px-12 lg:py-24">
            <div className="mx-auto hidden w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#12242f] shadow-2xl lg:block">
              {details.poster_path ? (
                <Image
                  src={`${POSTER_BASE_URL}${details.poster_path}`}
                  alt={`${title} poster`}
                  width={500}
                  height={750}
                  layout="responsive"
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center text-slate-500">No poster</div>
              )}
            </div>

            <div className="max-w-4xl">
              <Link href="/">
                <a className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-[#1ce783]">
                  <ArrowLeftIcon className="h-5 w-5" /> Back to browse
                </a>
              </Link>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1ce783]">
                {type === "tv" ? "TV series" : "Feature film"}
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
              {details.tagline && <p className="mt-4 text-xl italic text-slate-300">{details.tagline}</p>}

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
                {details.vote_average > 0 && (
                  <span className="flex items-center gap-2 rounded-full bg-[#1ce783] px-4 py-2 text-[#071b16]">
                    <StarIcon className="h-4 w-4" /> {details.vote_average.toFixed(1)}
                  </span>
                )}
                {releaseDate && (
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    <CalendarIcon className="h-4 w-4" /> {releaseDate.slice(0, 4)}
                  </span>
                )}
                {runtime && (
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                    <ClockIcon className="h-4 w-4" /> {runtime} min
                  </span>
                )}
                {details.status && <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">{details.status}</span>}
              </div>

              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {details.overview || "No overview is available for this title."}
              </p>

              {details.genres?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span key={genre.id} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Language</dt>
                  <dd className="mt-2 text-white">{details.original_language?.toUpperCase() || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Popularity</dt>
                  <dd className="mt-2 text-white">{Math.round(details.popularity || 0).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Votes</dt>
                  <dd className="mt-2 text-white">{(details.vote_count || 0).toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { type, id } = context.params;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken || !["movie", "tv"].includes(type) || !/^\d+$/.test(id)) {
    return {
      props: {
        details: null,
        type,
        error: "This title could not be found.",
      },
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`TMDB returned HTTP ${response.status}`);
    }

    const details = await response.json();
    context.res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1200");

    return { props: { details, type, error: null } };
  } catch (error) {
    console.error("Unable to load TMDB details:", error);
    return {
      props: {
        details: null,
        type,
        error: error.name === "AbortError"
          ? "TMDB took too long to respond. Please try again."
          : "The title details could not be loaded right now.",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
