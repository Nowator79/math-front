import { Component } from "react";
import { Container } from "react-bootstrap";
import {HOST} from './../../Settings';
import Quiz from "../blocks/Quiz";

class TestView extends Component{

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
					<h1>{this.state.title}</h1>
					<a className="make-btn" href="/person/test/">К списку</a>
				</div>
				{
					this.state.questions && 
					<Quiz questions={this.state.questions} />
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
			console.log(responseDataUser.body.DATA);
			this.setState(
				{
					"title": responseDataUser.body.NAME,
					"questions": JSON.parse(responseDataUser.body.DATA)
				}
			);
		} else {
			alert('Ошибка при отправке формы.');
		}
	}
}

export default TestView;