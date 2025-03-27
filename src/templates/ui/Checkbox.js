import React, { Component } from 'react';
import './Checkbox.css';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
	}


	render() {
		return (
			<div className="checkbox-container">
				<input type="checkbox" id="remember-me" />
				<label for="remember-me">Запомнить меня</label>
			</div>
		);
	}
}

export default Checkbox;