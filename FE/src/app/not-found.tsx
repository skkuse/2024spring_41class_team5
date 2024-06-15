import FullScreenLoader from './_components/loader/FullScreenLoader'

export default function Page() {
  return (
    <>
      <FullScreenLoader />
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xl">
        404 not found
      </h1>
    </>
  )
}
