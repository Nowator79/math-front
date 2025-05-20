import { Component } from "react";
import { Container } from "react-bootstrap";
import LinksBlock from "../ui/LinksBlock"
import {HOST} from './../../Settings';
import Input from "./../ui/Input";
import Button from "../ui/Button";

class PersonEdit extends Component{

	constructor(props) {
        super(props);
		this.state = {
			"user": props.user,
			"name": props.user.NAME,
			"login": props.user.LOGIN,
			"id": props.user.ID
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user && !this.state.user) {
			console.log(prevProps.user);
			this.setState({
				"user": prevProps.user,
				"name": prevProps.user.NAME,
				"login": prevProps.user.LOGIN,
				"id": prevProps.user.ID
			});
		}
	}

	async handleSubmit() {
		const { login, name, id } = this.state;

		// Валидация формы
		if (!login || !name) {
			alert('Все поля обязательны для заполнения!');
			return;
		}

		try {
			
			const response = await fetch(HOST + 'api/user/edit/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ id, login, name }), // Преобразуем данные в JSON
			});

			if (response.ok) {
				alert('Данные обновлены');
			} else {
				alert('Ошибка при отправке формы.');
			}
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Произошла ошибка при отправке формы.');
		}
	}

	render(){
		var user = this.state.user;
		if (user) {
			return <>
				<Container>
					<div className="heading">
						<h1>Редактирование профиля</h1>
						<a className="make-btn" href="/person/">Вернуться</a>
					</div>
					<div className="column-flex">
						<Input handle={this.handleChange} name="name" label="Имя" isFill={true} value={this.state.name}></Input>
						<Input handle={this.handleChange} name="login" label="E-mail" isFill={true} value={this.state.login}></Input>
						<Button text="Сохранить" onSubmit={this.handleSubmit}/>
					</div>
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

export default PersonEdit;