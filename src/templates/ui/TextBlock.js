import React, { Component } from 'react';
import './TextBlock.css';

class TextBlock extends Component {
	render() {
		if(!this.props.value){
			return "";
		}
		return (
			<div className="text-block">
				<label>
					{this.props.label}
				</label>
				<p>
					{this.props.value}
				</p>
			</div>
		);
	}
}

export default TextBlock;