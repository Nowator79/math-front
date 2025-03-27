import React, { Component } from 'react';
import './FormRow.css';

class FormRow extends React.Component {
	render() {
		const { children } = this.props;
		return (
			<div className="form-row">
				{children}
			</div>
		);
	}
}

export default FormRow;