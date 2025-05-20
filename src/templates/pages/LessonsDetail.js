import { Container } from "react-bootstrap";
import { Component } from 'react';
import {HOST} from './../../Settings';
import TextBlock from '../ui/TextBlock';
import FileView from "../blocks/FileView";
import { Navigate } from "react-router-dom";


class LessonsDetail extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: false
		};
		this.remove = this.remove.bind(this);
	}

	render() {
		if(!this.state.user){
			return <Container>
				<h3>Загрузка...</h3>
			</Container>
		}

		if(this.state.redirect){
			return <Navigate to={this.state.redirect} replace />;
		}

		return <>
			<Container>
				<div className="heading">
					<h1>{this.state.user.NAME}</h1>
					<div className="d-flex gap-3">
						<p onClick={this.remove} className="make-btn red-btn">Удалить</p>
						<a className="make-btn" href="/person/lessons/edit/?id={}">Редактировать</a>
						<a className="make-btn" href="/person/lessons/">К списку</a>
					</div>
				</div>
			
				<div>
					<p className="small-text">Класс: {this.state.user.CLASS != 0 ? this.state.user.CLASS : "не выбран" }</p>
					<TextBlock label="Предметная направленность" value={this.state.user.NAME_TYPE} />
					<TextBlock label="Описание" value={this.state.user.DESCRIPTION} />
					<TextBlock label="Цель" value={this.state.user.TARGET} />
					<FileView file={this.state.user.FILE} />
				</div>

			</Container>
		</>
	}

	async remove() {
		const searchParams = new URLSearchParams(window.location.search);
		const id = searchParams.get('id');
		const response = await fetch(HOST + 'api/lessons/remove/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(
				{ 
					"id": id
				}
			),
		});

		if (response.ok) {
			const responseDataUser = await response.json();
			this.setState(
				{
					redirect: "/person/lessons/"
				}
			);
		} else {
			alert('Ошибка при отправке формы.');
		}
	}
	
	async componentDidMount() {
		const searchParams = new URLSearchParams(window.location.search);
		const id = searchParams.get('id');
		const response = await fetch(HOST + 'api/lessons/detail/', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(
				{ 
					"id": id
				}
			),
		});

		if (response.ok) {
			const responseDataUser = await response.json();
			this.setState(
				{
					"user": responseDataUser.body
				}
			);
		} else {
			alert('Ошибка при отправке формы.');
		}
	}

}

export default LessonsDetail;