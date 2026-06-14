import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const start = () => setIsLoading(true)
    const finish = () => setIsLoading(false)

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', finish)
    router.events.on('routeChangeError', finish)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', finish)
      router.events.off('routeChangeError', finish)
    }
  }, [router.events])

  return (
    <>
      {isLoading && (
        <div className="fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-white/10">
          <div className="loading-bar h-full bg-[#1ce783]" />
        </div>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
