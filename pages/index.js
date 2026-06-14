import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({ results, error }) {
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Head>
        <title>Hulu 2.0</title>
        <meta name="description" content="Discover trending movies and shows." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Nav />

      {error ? (
        <section className="mx-auto my-20 max-w-xl px-6 text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full bg-[#1ce783]/15 p-3 text-[#1ce783]">
              <span className="block text-xl leading-6">!</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">Unable to load the library</h1>
            <p className="mt-3 leading-7 text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-7 rounded-full bg-[#1ce783] px-6 py-3 font-semibold text-[#071b16] transition hover:bg-[#42f59a]"
            >
              Try again
            </button>
          </div>
        </section>
      ) : (
        <Results results={results} />
      )}

      
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      props: {
        results: [],
        error: "TMDB is not configured. Add TMDB_ACCESS_TOKEN to .env.local and restart the development server.",
      },
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(
      `https://api.themoviedb.org/3${
        requests[genre]?.url || requests.fetchTrending.url
      }`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`TMDB returned HTTP ${response.status}`);
    }

    const request = await response.json();
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return {
      props: {
        results: request.results || [],
        error: null,
      },
    };
  } catch (error) {
    console.error("Unable to load movies from TMDB:", error);

    return {
      props: {
        results: [],
        error: error.name === "AbortError"
          ? "TMDB took too long to respond. Please try again in a moment."
          : "Check your internet connection and TMDB access token, then try again.",
      },
    };
  }

}
