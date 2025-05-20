import { Container } from "react-bootstrap";
import { Component } from 'react';
import TestsSection from "./../blocks/TestsSection";
import TabsSelect from "./../blocks/TabsSelect"
import {HOST} from './../../Settings';

class TestList extends Component {
	
	constructor(props) {
        super(props);
		this.state = {
			lessons: [],
			tabs: []
		};
    }
	
	render() {
		return <>
			<Container>
				<div className="heading">
					<h1>Тесты</h1>
					<a className="make-btn" href="make/"><p>+</p>Создать</a>
				</div>
				<div className="column-flex"> 
					<TabsSelect list={this.state.tabs}/>
					<TestsSection list={this.state.lessons} />
				</div>
			</Container>
		</>
	};
	
	componentDidMount() {
		fetch(HOST + "api/tests/get/",
			{
				credentials: 'include',
			}
		)
		.then(res => res.json())
		.then(
			(resultLessons) => {

				fetch(HOST + "api/get-types/",
					{
						credentials: 'include',
					}
				)
				.then(res => res.json())
				.then(
					(resultTabs) => {
						this.setState({
							tabs: resultTabs.body,
							lessons: resultLessons.body
						});
					},
					(error) => {
						
					}
				);
			},
			(error) => {
				
			}
		);
	}
}

export default TestList;