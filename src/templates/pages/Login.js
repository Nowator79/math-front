import { Container } from "react-bootstrap";
import Form from "./../blocks/Form";
import SimpleBlock from "./../blocks/SimpleBlock";
import FormRow from "./../blocks/FormRow";
import Input from "./../ui/Input";
import Button from "./../ui/Button";
import Checkbox from "./../ui/Checkbox";
import "./Login.css";
import {HOST} from './../../Settings';
import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		// Инициализация состояния для хранения данных формы
		this.state = {
			login: '',
			password: '',
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

	// Обработчик отправки формы
	async handleSubmit(event) {
		event.preventDefault(); // Предотвращаем стандартное поведение формы
		console.log(this.state);

		const { login, password } = this.state;

		// Валидация формы
		if (!login || !password) {
			alert('Все поля обязательны для заполнения!');
			return;
		}

		try {
			// Отправляем данные на сервер
			
			const response = await fetch(HOST + 'api/user/login/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ login, password }), // Преобразуем данные в JSON
			});

			if (response.ok) {
				alert('Форма успешно отправлена!');
				// this.setState({
				// 	login: '',
				// 	password: '',
				// });
			} else {
				alert('Ошибка при отправке формы.');
			}
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Произошла ошибка при отправке формы.');
		}
	}

	render() {
		return <>
			<Container>
				<SimpleBlock>
					<div className="page-login">
						<Form handleSubmit={this.handleSubmit}>
							<h1>Авторизация</h1>
							<Input handle={this.handleChange} name="login" label="E-mail" isFill={true}></Input>
							<Input handle={this.handleChange} name="password" label="Пароль" isFill={true}></Input>
							<FormRow>
								<Checkbox name="isremember"></Checkbox>
								<a href="">Забыли пароль?</a>
							</FormRow>
							<Button text="Отправить"></Button>
						</Form>
						<div>
							<img src={require('./../../images/logo-big.png')} />
						</div>
					</div>

				</SimpleBlock>
			</Container>
		</>
	}
}

export default Login;