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
import {DataConsumer} from './../../DataUserContext';
import { ReactComponent as LogoSvg } from './../../images/logo-site.svg';

class Reg extends Component {
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
		const { name, login, password } = this.state;

		// Валидация формы
		if (!login || !password|| !login) {
			alert('Все поля обязательны для заполнения!');
			return;
		}

		try {
			// Отправляем данные на сервер
			
			const response = await fetch(HOST + 'api/user/reg/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ name, login, password}), // Преобразуем данные в JSON
			});

			if (response.ok) {
				const responseDataUser = await response.json();
				this.props.context.setData(responseDataUser.body);
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
							<h1>Регистрация</h1>
							<Input handle={this.handleChange} name="name" label="Имя" isFill={true}></Input>
							<Input handle={this.handleChange} name="login" label="E-mail" isFill={true}></Input>
							<Input handle={this.handleChange} name="password" label="Пароль" isFill={true}></Input>
							<Button text="Зарегистрироваться"></Button>
						</Form>
						<div className="logo-login">
							<LogoSvg/>
						</div>
					</div>

				</SimpleBlock>
			</Container>
		</>
	}
}

export default function RegWithContext(props) {
	return (
		<DataConsumer>
			{context => <Reg {...props} context={context} />}
		</DataConsumer>
	);
}