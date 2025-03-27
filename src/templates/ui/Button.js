import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
	}

	render() {
		return (
			<input type="submit" value={this.props.text}/>
		);
	}
}

export default Button;