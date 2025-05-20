import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	constructor(props) {
		super(props);
	}

	onSubmit(){
		if (this.props.onSubmit){
			this.props.onSubmit();
		}
	}

	render() {
		
		return (
			<input type="submit" onClick={() => this.onSubmit()} value={this.props.text}/>
		);
	}
}


export default Button;