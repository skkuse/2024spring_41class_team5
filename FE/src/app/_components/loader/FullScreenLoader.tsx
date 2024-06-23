import './FullScreenLoader.css'

const FullScreenLoader = () => {
  return (
    <div>
      <div className="ball bg-green-800"></div>
      <span className="shadow"></span>
      <div className="crosspaths">
        <div className="crosspath"></div>
        <div className="crosspath"></div>
        <div className="crosspath"></div>
        <div className="crosspath"></div>
      </div>
    </div>
  )
}

export default FullScreenLoader
