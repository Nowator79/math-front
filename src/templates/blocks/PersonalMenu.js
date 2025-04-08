import React, { Component } from 'react';
import './PersonalMenu.css';

class PersonalMenu extends React.Component {
	state = {
		isActive: false
	};

	handleClick = () => {
		this.setState({ isActive: !this.state.isActive });
	};
	
	render() {
		var menu = [
			{
				name: "Профиль",
				href: "/person/"
			},{
				name: "Уроки",
				href: "/person/lesson/"
			},{
				name: "Материалы",
				href: "/person/materials/"
			},{
				name: "Открытые материалы",
				href: "/person/materials/"
			},
		];

		var classes = ["personal-menu-block"];

		if(this.state.isActive){
			classes.push("active");
		}

		return (
			<div className={classes.join(" ")}>
				<ul className='personal-menu'>
					{menu.map((item, index) => (
						<li key={index}>
							<a href={item.href}>
								{item.name}
							</a>
						</li>
					))}
					<button className='toggle-personal-menu' onClick={this.handleClick}>
						<svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.6066 2L12.2132 12.6066L1.6066 23.2132" stroke="#b747ac" stroke-width="4"/>
						</svg>
					</button>
				</ul>
			</div>
		);
	}
}

export default PersonalMenu;