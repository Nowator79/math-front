import { Container } from "react-bootstrap";
import { Component } from 'react';
import {HOST} from './../../Settings';
import TextBlock from '../ui/TextBlock'
import FileView from "../blocks/FileView";


class MaterialsDetail extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}

	render() {
		if(!this.state.user){
			return <Container>
				<h3>Загрузка...</h3>
			</Container>
		}
		return <>
			<Container>
				<div className="heading">
					<h1>{this.state.user.NAME}</h1>
					<div className="d-flex gap-3">
						<a className="make-btn red-btn" href="">Удалить</a>
						<a className="make-btn" href="/person/materials/edit/">Редактировать</a>
						<a className="make-btn" href="/person/materials/">К списку</a>
					</div>
				</div>
			
				<div>
					<p className="small-text">Класс: 2</p>
					<TextBlock label="Предметная направленность" value={this.state.user.NAME_TYPE} />
					<TextBlock label="Описание" value={this.state.user.DESCRIPTION} />
					<FileView file={this.state.user.FILE} />
				</div>

			</Container>
		</>
	};
	
	async componentDidMount() {
		const searchParams = new URLSearchParams(window.location.search);
		const id = searchParams.get('id');
		const response = await fetch(HOST + 'api/materials/detail/', {
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

export default MaterialsDetail;