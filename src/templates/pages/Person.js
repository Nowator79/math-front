import { Component } from "react";
import { Container } from "react-bootstrap";
import LinksBlock from "../ui/LinksBlock"

class Person extends Component{

	constructor(props) {
        super(props);
		this.state = {
			user: props.user,
		};
    }

	render(){
		var user = this.props.user;
		if (user) {
			return <>
				<Container>
					<div className="heading">
						<h1>Личный кабинет</h1>
						<a className="make-btn" href="/person/edit/">Редактировать профиль</a>
					</div>
					<div className="block-info">
						<p className="param-text">Имя: {user.NAME}</p>
						<p className="param-text">Почта: {user.LOGIN}</p>
					</div>
					<LinksBlock/>
				</Container>
			</>	
		}else{
			return <Container>
				<h1>Требуется вход </h1>
				<a href="/login/">Войти</a>
			</Container>
		}
	}
}

export default Person;