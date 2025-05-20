import { Container } from "react-bootstrap";
import { Component } from 'react';
import TestMake from "../blocks/TestMake";

class TestMakePage extends Component {
	
	render() {
		return <>
			<Container>
				<div className="heading">
					<h1>Создание теста</h1>
					<a className="make-btn" href="/person/test/">К списку</a>
				</div>
				<TestMake/>
			</Container>
		</>
	};
	
	componentDidMount() {
	}
}

export default TestMakePage;