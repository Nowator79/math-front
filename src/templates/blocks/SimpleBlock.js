import React, { Component } from 'react';
import './SimpleBlock.css';

class SimpleBlock extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<div className="simple-block">
				{children}
			</div>
		);
	}
}

export default SimpleBlock;