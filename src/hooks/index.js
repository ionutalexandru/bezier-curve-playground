import { useState, useEffect, useRef } from "react";
import svgUtils from "utils/svg";

const { getViewBox } = svgUtils;

export function useWindowSize() {
  const { innerWidth: width, innerHeight: height } = window;
  const [windowSize, setWindowSize] = useState({ width, height });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;

      setWindowSize({ width, height });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function useSVG(zoom = 1, x = null, y = null) {
  const svgRef = useRef(null);
  const [svg, setSVG] = useState(null);
  const { width, height } = useWindowSize();
  const initViewBox = getViewBox(width, height, zoom, x, y);
  const [viewBox, setViewBox] = useState(initViewBox);

  useEffect(() => {
    const { current } = svgRef;
    if (current) {
      setSVG(current);
    }
  }, []);

  useEffect(() => {
    const viewBox = getViewBox(width, height, zoom, x, y);
    setViewBox(viewBox);
  }, [zoom, x, y]);

  return { svgRef, svg, viewBox };
}
