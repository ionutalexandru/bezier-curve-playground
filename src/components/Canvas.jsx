import "./Canvas.css";
import { useRef, useState, useEffect } from "react";

function getCoordinates(clientX, clientY, canvas) {
  /**
   * Function returning the coordinates of a click
   * event relative to the canvas
   */
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) * canvas.width) / rect.width;
  const y = ((clientY - rect.top) * canvas.height) / rect.height;
  return [x, y];
}

function drawDot(x, y, canvas) {
  /**
   * Function drawing a dot (a circle) in the clicked
   * point inside the canvas
   */
  //const [x, y] = getCoordinates(clientX, clientY, canvas);
  const context = canvas.getContext("2d");
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2);
  context.fill();
}

function drawDots(coordinates, canvas) {
  coordinates.forEach(([x, y]) => drawDot(x, y, canvas));
}

export default function Canvas() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvas(canvas);
    if (canvas) {
      canvas.height = canvas.parentElement.offsetHeight;
      canvas.width = canvas.parentElement.offsetWidth;
    }
  }, []);

  useEffect(() => {
    drawDots(coordinates, canvas);
  }, [coordinates]);

  return (
    <div className="Canvas">
      <canvas
        ref={canvasRef}
        onClick={({ clientX, clientY }) =>
          setCoordinates((current) => [
            ...current,
            getCoordinates(clientX, clientY, canvas),
          ])
        }
      />
    </div>
  );
}
