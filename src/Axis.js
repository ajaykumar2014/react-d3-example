import React from "react";
import * as d3 from 'd3';

class Axis extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.updateAxis();
  }
  renderAxis() {
    const { scale, orient, ticks,width } = this.props;
    const node = this.ref.current;
    let axis;
      console.log('width', width);
    if (orient === "bottom") {
        axis = d3.axisBottom(scale).ticks(width / 80).tickSizeOuter(0);
    }
    if (orient === "left") {
        axis = d3.axisLeft(scale)
            .ticks(ticks);
    }
    d3.select(node).call(axis);
  }
  updateAxis() {
    const { scale, orient, ticks } = this.props;
    const t = d3.transition().duration(1000)

    if (orient === "left") {
      const axis = d3.axisLeft(scale).ticks(ticks); 
      d3.selectAll(`.${orient}`).transition(t).call(axis)
    }
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={this.ref}
        transform={transform}
        className={`${orient} axis`}
      />
    );
  }
}

export default Axis;
