import { useEffect, useRef, useState } from "react";
import { CONTROL_POINT_SETTINGS, TANGENT_LINE_SETTINGS } from "../settings";
import { useWindowSize } from "../hooks";
import Icon from "./icons/Bin";

function createSVGPoint(clientX, clientY, svg) {
  const pt = svg.createSVGPoint();

  pt.x = clientX;
  pt.y = clientY;

  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

export default function Canvas({ points = [], setPoints }) {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState(null);
  const { width, height } = useWindowSize();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const current = svgRef.current;
    setSvg(current);
  }, []);

  const handleOnClickCanvas = ({ clientX, clientY, target }) => {
    if (target.tagName === "circle") return;
    if (selectedNode) return;
    const { x, y } = createSVGPoint(clientX, clientY, svg);
    const position = points.length;
    const id = position;
    setPoints((points) => [...points, { id, x, y, position }]);
  };

  const handleClearCanvas = () => {
    setPoints([]);
  };

  const handleOnMouseMove = ({ clientX, clientY }) => {
    if (selectedNode !== null) {
      const _points = [...points];
      const point = _points[_points.findIndex(({ id }) => selectedNode === id)];
      const { x, y } = createSVGPoint(clientX, clientY, svg);
      point.x = x;
      point.y = y;
      setPoints(_points);
    }
  };

  const getBezierPath = () => {
    return points
      .map(({ x, y }, index) =>
        index === 0
          ? `M${x},${y}`
          : index % 2 === 0 || points.length === 2
          ? `${x},${y}`
          : points.length % 2 === 0 && index + 1 === points.length
          ? null
          : `Q${x},${y}`
      )
      .filter((val) => val !== null)
      .join(" ");
  };

  const getSVGViewBox = () =>
    width && height ? `0 0 ${width} ${height}` : "0 0 100 100";

  return (
    <div className="flex-1 h-full bg-gray-50">
      <svg
        width="100%"
        height="100%"
        viewBox={getSVGViewBox()}
        onClick={handleOnClickCanvas}
        ref={svgRef}
        onMouseMove={handleOnMouseMove}
      >
        {points.slice(0, points.length - 1).map(({ id, x, y }, index) => (
          <line
            key={`line-${id}`}
            x1={x}
            y1={y}
            x2={points[index + 1].x}
            y2={points[index + 1].y}
            stroke={TANGENT_LINE_SETTINGS.stroke}
            strokeWidth={TANGENT_LINE_SETTINGS.strokeWidth}
          />
        ))}
        {points.length === 1 ? null : (
          <path
            d={getBezierPath()}
            stroke="black"
            strokeWidth={2}
            fill="none"
          />
        )}
        {points.map(({ id, x, y }) => (
          <circle
            key={`circle-${id}`}
            cx={x}
            cy={y}
            r={CONTROL_POINT_SETTINGS.radius}
            fill={CONTROL_POINT_SETTINGS.fill}
            stroke={CONTROL_POINT_SETTINGS.stroke}
            strokeWidth={CONTROL_POINT_SETTINGS.strokeWidth}
            onMouseDown={() => setSelectedNode(id)}
            onMouseUp={() => setSelectedNode(null)}
            className={id === selectedNode ? "grabbing" : null}
          />
        ))}
      </svg>
      <button
        onClick={handleClearCanvas}
        className="absolute bottom-2 right-2 rounded-full bg-green-400 hover:bg-green-600 text-white p-2"
      >
        <Icon />
      </button>
    </div>
  );
}
