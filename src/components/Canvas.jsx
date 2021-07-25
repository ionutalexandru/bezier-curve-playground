import "./Canvas.css";
import COLORS from "../constants/colors";
import { useEffect, useRef, useState } from "react";

function getRandomColor(usedColors) {
  const remainingColors = COLORS.filter((color) => !usedColors.includes(color));
  return remainingColors[Math.floor(Math.random() * remainingColors.length)];
}

function createSVGPoint(clientX, clientY, svg) {
  const pt = svg.createSVGPoint();

  pt.x = clientX;
  pt.y = clientY;

  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

const DOT_RADIUS = "0.1rem";

export default function Canvas({ points = [], setPoints }) {
  const svgRef = useRef(null);
  const [svg, setSvg] = useState(null);
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
    const color = getRandomColor(points.map(({ color }) => color));
    setPoints((points) => [...points, { id, x, y, position, color }]);
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

  return (
    <div className="Canvas">
      <div className="CanvasWrapper">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
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
              stroke="Gray"
              strokeWidth={0.25}
            />
          ))}
          {points.length === 1 ? null : (
            <path
              d={getBezierPath()}
              stroke="black"
              strokeWidth={0.5}
              fill="none"
            />
          )}
          {points.map(({ id, x, y, color }) => (
            <circle
              key={`circle-${id}`}
              cx={x}
              cy={y}
              r={DOT_RADIUS}
              fill={color}
              onMouseDown={() => setSelectedNode(id)}
              onMouseUp={() => setSelectedNode(null)}
              className={id === selectedNode ? "grabbing" : null}
            />
          ))}
        </svg>
      </div>
      <button onClick={handleClearCanvas} className="ClearButton">
        Clear
      </button>
    </div>
  );
}
