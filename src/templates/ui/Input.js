import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.handle(event);
		this.setState({ value: event.target.value });
	}

	render() {
		const classes = ["field-input"];
		if (this.state.value.length >= 1) {
			classes.push("active");
		}

		const classesStr = classes.join(" ");

		const inputId = `input-${this.props.name}`;

		return (
			<div className={classesStr}>
				<label htmlFor={inputId} className="label">
					{this.props.label}
				</label>
				<input
					id={inputId}
					className="input"
					onChange={this.handleChange}
					name={this.props.name}
					value={this.state.value} // Управляемое значение input
				/>
			</div>
		);
	}
}

export default Input;