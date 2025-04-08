import { Component } from "react";
import { Container } from "react-bootstrap";

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
					<h1>Личный кабинет: {user.NAME}</h1>
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