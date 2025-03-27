import React, { Component } from 'react';
import './Form.css';

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return (
			<form className="form" onSubmit={this.props.handleSubmit}>
				{children}
			</form>
		);
	}
}

export default Form;