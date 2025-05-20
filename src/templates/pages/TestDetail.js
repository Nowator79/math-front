import { Container } from "react-bootstrap";
import { Component } from 'react';
import {HOST} from './../../Settings';
import TestMake from "../blocks/TestMake";


class TestDetail extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			questions: false,
		};
	}

	render() {
		return <>
			<Container>
				<div className="heading">
					<h1>Редактирование теста</h1>
					<a className="make-btn" href="/person/test/">К списку</a>
				</div>
				{
					this.state.questions && 
					<TestMake questions={this.state.questions} title={this.state.title} test_id={this.state.id}/>
				}
			</Container>
		</>
	};
	
	async componentDidMount() {
		const searchParams = new URLSearchParams(window.location.search);
		const id = searchParams.get('id');
		const response = await fetch(HOST + 'api/tests/detail/', {
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
					"title": responseDataUser.body.NAME,
					"questions": JSON.parse(responseDataUser.body.DATA),
					"id": id
				}
			);
		} else {
			alert('Ошибка при отправке формы.');
		}
	}

}

export default TestDetail;