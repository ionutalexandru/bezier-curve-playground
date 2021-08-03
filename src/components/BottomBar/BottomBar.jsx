import BinIcon from "Icons/Bin";
import PlusIcon from "Icons/Plus";
import MinusIcon from "Icons/Minus";
import { ZOOM_DIFF, MAX_ZOOM, MIN_ZOOM } from "settings";

function BottomBar({ onClearCanvas, zoom, setZoom }) {
  const onZoom = (isZoomingIn = true) => {
    if (
      (isZoomingIn && zoom >= MAX_ZOOM) ||
      (!isZoomingIn && zoom <= MIN_ZOOM)
    ) {
      return;
    } else if (isZoomingIn) {
      setZoom((c) => (c * 10 + ZOOM_DIFF * 10) / 10);
    } else {
      setZoom((c) => (c * 10 - ZOOM_DIFF * 10) / 10);
    }
  };

  const onZoomIn = () => {
    onZoom(true);
  };

  const onZoomOut = () => {
    onZoom(false);
  };

  return (
    <div className="absolute bottom-2 w-full">
      <div className="w-100 px-2 flex justify-between">
        <div className="flex bg-white rounded shadow">
          <button
            onClick={onZoomOut}
            className="rounded-md bg-white hover:bg-gray-100 text-black p-2 m-1 h-5 w-5"
          >
            <MinusIcon />
          </button>
          <button
            onClick={onZoomIn}
            className="rounded-md bg-white hover:bg-gray-100 text-black p-2 m-1 h-5 w-5"
          >
            <PlusIcon />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="rounded-md bg-white hover:bg-gray-100 text-black p-2 m-1 h-5"
          >
            {Number.parseInt(zoom * 100)} %
          </button>
        </div>
        <button
          onClick={onClearCanvas}
          className="rounded-full bg-white hover:bg-gray-100 shadow text-black p-2 h-6 w-6"
        >
          <BinIcon />
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
