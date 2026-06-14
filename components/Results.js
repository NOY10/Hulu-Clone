import FlipMove from "react-flip-move";
import Thumbnail from './Thumbnail'

function Results({results}) {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1ce783]">Now streaming</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Discover something great</h1>
        </div>
        <p className="hidden text-sm text-slate-500 sm:block">{results.length} titles</p>
      </div>
      <FlipMove className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {results.map((result, index) =>(
        <Thumbnail key={result.id} result={result} priority={index < 3} />
      ))}
      </FlipMove>
    </main>
  )
}

export default Results
