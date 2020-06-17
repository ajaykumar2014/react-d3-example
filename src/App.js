import React from 'react';
import './App.css';
import PieChart from './PieChart';
import * as d3 from 'd3';
import faker from 'faker';
import LineChart from './LineChart';

function generateData(level) {
	const N = d3.randomUniform(1, 10)();
	return d3.range(N).map((i) => ({
		value: Math.abs(d3.randomNormal()()),
		id: `${level}-${i}`,
		level: level,
		index: i,
		name: faker.internet.userName(),
		children: level > 0 ? generateData(level - 1) : []
	}));
}

function generateLineData() {
	const rnd = d3.randomUniform(1,1000);
	let data = d3
		.range(50)
		.map((i) => {
			return {
				date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
				value: rnd()
			};
		})
		.reverse();

	return data;
	
}
function App() {
	const pieData = generateData(4);
	const lineData = generateLineData();
	const margin = ({top: 20, right: 30, bottom: 30, left: 40})
	return (
		<div className="App">
			<svg width="500" height="500">
				<PieChart data={pieData} x={250} y={250} />
			</svg>
			<svg width="500" height="500">
				<LineChart data={lineData} height="400" width="400" margin={margin}/>
			</svg>
			
		</div>
	);
}

export default App;
