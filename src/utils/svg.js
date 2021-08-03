const getPointFromEvent = (event) => {
  let x = 0;
  let y = 0;
  if (event.targetTouches) {
    x = event.targetTouches[0].clientX;
    y = event.targetTouches[0].clientX;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  return { x, y };
};

const svg = {
  getViewBox: (w, h, zoom, x = null, y = null) => {
    const factor = 2 - zoom; // 1 + (1 - zoom)
    const _w = (w * factor).toFixed(2);
    const _h = (h * factor).toFixed(2);
    const _x = !x ? 0 : x * factor;
    const _y = !y ? 0 : y * factor;
    return [_x, _y, _w, _h].join(" ");
  },
  createPoint: (event, svg) => {
    const pt = svg.createSVGPoint();
    const { x, y } = getPointFromEvent(event);
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  },
  drawLine: (x, y, color, width) => (
    <line
      x1={x[0]}
      y1={y[0]}
      x2={x[1]}
      y2={y[1]}
      stroke={color}
      strokeWidth={width}
    />
  ),
};

export default svg;
