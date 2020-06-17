import React from 'react';
import Axis from "./Axis";

const XYAxis = ({ xScale, yScale,width, height,margin,ticks }) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0,${height - margin.bottom})`,
    
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: `translate(${margin.left},0)`,
    
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} width={width} />
      <Axis {...ySettings} width={width}/>
    </g>
  );
};

export default XYAxis;