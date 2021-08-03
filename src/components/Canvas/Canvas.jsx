import { useState, useRef } from "react";
import { CONTROL_POINT_SETTINGS, TANGENT_LINE_SETTINGS } from "settings";
import svgUtils from "utils/svg";
import { useSVG } from "hooks";
import { BottomBar } from "components";

const Canvas = ({ action, points = [], setPoints }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [posX, setX] = useState(0);
  const [posY, setY] = useState(0);
  const { svgRef, svg, viewBox } = useSVG(zoom, posX, posY);
  const [isPanning, setIsPanning] = useState(false);
  const origin = useRef({ x: 0, y: 0 });
  const viewBoxRef = useRef({ x: 0, y: 0 });

  const handleClearCanvas = () => {
    setPoints([]);
  };

  const handleOnClickCanvas = (event) => {
    if (!svg) return;
    const { target } = event;
    if (action === "CLICK") return;
    if (target.tagName === "circle") return;
    if (selectedNode) return;
    const { x, y } = svgUtils.createPoint(event, svg);
    const position = points.length;
    const id = position;
    setPoints((points) => [...points, { id, x, y, position }]);
  };

  const handleOnMouseMove = (event) => {
    if (!svg) return;
    const { x, y } = svgUtils.createPoint(event, svg);
    if (selectedNode !== null) {
      const _points = [...points];
      const point = _points[_points.findIndex(({ id }) => selectedNode === id)];
      point.x = x;
      point.y = y;
      setPoints(_points);
    } else if (isPanning) {
      const _x = viewBoxRef.current.x - (event.clientX - origin.current.x);
      const _y = viewBoxRef.current.y - (event.clientY - origin.current.y);
      setX(_x);
      setY(_y);
    }
  };
  return (
    <div
      className={`flex-1 h-full bg-gray-50 ${
        isPanning
          ? "cursor-grabbing"
          : action === "CLICK"
          ? "cursor-grab"
          : "cursor-crosshair"
      }`}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={viewBox}
        onClick={handleOnClickCanvas}
        onMouseMove={handleOnMouseMove}
        onMouseDown={(event) => {
          if (action === "CLICK" && !isPanning) {
            setIsPanning(true);
            const { x, y } = svgUtils.createPoint(event, svg);
            origin.current = { x, y };
          }
        }}
        onMouseUp={() => {
          if (isPanning) {
            setIsPanning(false);
            const rect = svg.getBoundingClientRect();
            viewBoxRef.current = { x: rect.x, y: rect.y };
          }
        }}
      >
        <InnerCanvas
          svg={svg}
          points={points}
          setPoints={setPoints}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      </svg>
      <BottomBar
        onClearCanvas={handleClearCanvas}
        setZoom={setZoom}
        zoom={zoom}
      />
    </div>
  );
};

const InnerCanvas = ({ points = [], selectedNode, setSelectedNode }) => {
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
    <>
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
        <path d={getBezierPath()} stroke="black" strokeWidth={2} fill="none" />
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
    </>
  );
};

export default Canvas;
