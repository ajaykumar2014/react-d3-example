import React, { useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Path = styled.path`
	fill: ${props =>
		props.level === 4
		? d3.schemePaired[props.index] 
		: d3.color(d3.schemePaired[0]).brighter(props.index)};
	cursor: pointer;
	stroke: black;
`;

const Arc = ({ arcData, onClick }) => {
	const [ radiusAdd, setRadiusAdd ] = useState(0);

	function mouseOut() {
		setRadiusAdd(0);
	}

	function mouseOver() {
		setRadiusAdd(20);
	}
	const arc = d3.arc().innerRadius(15 + radiusAdd / 2).outerRadius(105 + radiusAdd);
	return (
		<Path
			d={arc(arcData)}
			index={arcData.data.index}
			level={arcData.data.level}
			onMouseOut={mouseOut}
			onMouseOver={mouseOver}
			onClick={onClick}
		/>
	);
};

export default function PieChart({ data, x, y }) {
	const [ renderData, setRenderData ] = useState(data);
	const pie = d3.pie().value((d) => d.value);
	function drilldown(index) {
		setRenderData(renderData[index].children);
	}
	return (
		<g transform={`translate(${x},${y})`}>
			{' '}
			{pie(renderData).map((d) => <Arc arcData={d} key={d.index} onClick={() => drilldown(d.index)} />)}{' '}
		</g>
	);
}
