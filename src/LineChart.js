/* eslint-disable no-unused-expressions */
import React, { useState,useRef, createRef } from 'react';
import * as d3 from 'd3';

import XYAxis from './xy-axis';
import Line from './Line';
import styled from 'styled-components';

export default function LineChart({ data, height, width, margin }) {
	// const h = height - 2 * margin,
	// 	  w = width  - 2 * margin;
	const [tooltips, setTooltips] = useState();
	
	const ref = useRef(this);
	const ref2 = createRef();

	

	console.log('data', data);
	const xScale = d3.scaleUtc().domain(d3.extent(data, (d) => d.date)).range([ margin.left, width - margin.right ]);

	const yScale = d3
		.scaleLinear()
		.domain([ 0, d3.max(data, (d) => d.value) ])
		.nice()
		.range([ height - margin.bottom, margin.top ]);

	const linePath = d3
		.line()
		.curve(d3.curveStep)
		.x((d) => {
			return xScale(d.date);
		})
		.y((d) => {
			return yScale(d.value);
		})
		.curve(d3.curveMonotoneX);

	const t = d3.transition().duration(1000);

	

	// function mouseOver() {
	// 	const bisect = d3.bisector(d => d.date).left;
	// 	const date = xScale.invert(this);
	// 	console.log('xScale.invert', this,bisect(data,date,1))
	// }

	const xDimension = (d => d.date);
	const yDimension = (d => d.value);

	return (
		<g transform={`translate(${20},${20})`} className="line-group" ref={ref2}>
			{' '}
			<XYAxis {...{ xScale, yScale, width, height, margin, t }} />
			<Line
				path={linePath(data)}
				fill={'none'}
				strokeLinecap={'round'}
				stroke={'steelblue'}
				strokeWidth="1.5"
				strokeLinejoin="round"
				ref={ref}
			/>
			{data.map(d => (
				<text x={xScale(d.date)}
					y={yScale(d.value)}
					textAnchor="center"
					font-size="8px"
					onMouseOver={() => setTooltips(d)}
					onMouseOut={()=>setTooltips(false)}
				>
					£
				</text>
			))}
			{tooltips && <Tooltips x={xScale(xDimension(tooltips))} y={yScale(yDimension(tooltips))} info={tooltips} />}{' '}
		</g>
	);
}

// const Tooltips = ({ xScale, yScale, date, value, info }) => {
// 	<g transform={`translate(${xScale(date)},${yScale(value)})`}>
// 		<div>
// 			<strong>{info.date}</strong>
// 			<p>{info.value}</p>
// 		</div>
// 	</g>;
// };

function formatDate(date) {
  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

const ForeignObject = styled.foreignObject`

	background: lightblue;
    padding: 5px;
    font-size: 9px;
    display: inline-block;

`
const Tooltips = ({ x, y, info }) => {
	return <ForeignObject x={x} y={y} width={100} height={50}>
		<div>
			<strong>{formatDate(info.date)}</strong>
			<p>{info.value}</p>
		</div>
	</ForeignObject>;
};
