import { Container } from "react-bootstrap";
import { Component } from 'react';
import LessonsSection from "./../blocks/LessonsSection";
import TabsSelect from "./../blocks/TabsSelect"
import {HOST} from './../../Settings';

class Lessons extends Component {
	
	constructor(props) {
        super(props);
		this.state = {
			list: [],
			tabs: [],
			filter: {},
		};

		this.selectTab = this.selectTab.bind(this);
		this.selectClass = this.selectClass.bind(this);

    }
	
	render() {
		return <>
			<Container>
				<div className="heading">
					<h1>Уроки</h1>
					<a className="make-btn" href="make/"><p>+</p>Создать</a>
				</div>
				<div className="column-flex"> 
					<TabsSelect list={this.state.tabs} onChange={this.selectTab}/>
					<div className="w-100 d-flex align-items-center gap-3 select">
						<p>Класс:</p>
						<select onChange={this.selectClass}>
							<option>Не выбран</option>
							{Array.from({ length: 11 }, (_, i) => (
								<option key={i + 1}>{i + 1}</option>
							))}
						</select>
					</div>
					<LessonsSection list={this.state.list} />
				</div>
			</Container>
		</>
	};
	

	selectClass(event){
		var filter = {
			class: event.target.value,
			type: this.state.filter.type
		}
		fetch(HOST + "api/lessons/get/",
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(filter),
			}
		)
		.then(res => res.json())
		.then(
			(resultLessons) => {
				this.setState(
					{
						list: resultLessons.body,
						filter: filter
					}
				)
			},
			(error) => {
				
			}
		);
    }

	selectTab(name, value){
		var	filter = {
			class: this.state.filter.class,
			type: value
		};
		
		fetch(HOST + "api/lessons/get/",
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(filter),
			}
		)
		.then(res => res.json())
		.then(
			(resultLessons) => {
				this.setState(
					{
						list: resultLessons.body,
						filter: filter
					}
				)
			},
			(error) => {
				
			}
		);
    }

	componentDidMount() {
		fetch(HOST + "api/lessons/get/",
			{
				credentials: 'include',
			}
		)
		.then(res => res.json())
		.then(
			(resultLessons) => {

				fetch(HOST + "api/lessons/get-types/",
					{
						credentials: 'include',
					}
				)
				.then(res => res.json())
				.then(
					(resultTabs) => {
						this.setState({
							tabs: resultTabs.body,
							list: resultLessons.body
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

export default Lessons;