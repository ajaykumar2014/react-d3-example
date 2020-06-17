import React from 'react';
import * as d3 from 'd3';
import XYAxis from './xy-axis';

export default function LineChart({ data,height,width,margin }) {
		const h = height - 2 * margin,
			  w = width  - 2 * margin;

	console.log('data', data);
	const xScale = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
		 .range([margin.left, width - margin.right])

	const yScale = d3.scaleLinear()
    	.domain([0, d3.max(data, d => d.value)]).nice()
		.range([height - margin.bottom, margin.top])
		

	const linePath = d3
		.line()
		.x((d) => {
			return xScale(d.date);
		})
		.y((d) => {
			return yScale(d.value);
		})
		.curve(d3.curveMonotoneX);
	
	//const ticks = 5;
	const t = d3.transition().duration(1000);

	return (
		<g transform={`translate(${20},${20})`} className="line-group">
			{' '}
			<XYAxis {...{ xScale, yScale, width,height,margin, t } }/>
			<path d={linePath(data)} fill={'none'}
				stroke-linecap={'round'}
				stroke={'steelblue'}
				stroke-width="1.5"
				stroke-linejoin="round"
				/>
			{' '}
		</g>
	);
}
