import { Container } from "react-bootstrap";
import { Component } from 'react';
import MaterialsSection from "./../blocks/MaterialsSection";
import TabsSelect from "./../blocks/TabsSelect"
import {HOST} from './../../Settings';

class Materials extends Component {
	
	constructor(props) {
        super(props);
		this.state = {
			list: [],
			tabs: []
		};
		
		// Привязка метода
		this.selectTab = this.selectTab.bind(this);
    }
	
	render() {
		return <>
			<Container>
				<div className="heading">
					<h1>Материалы</h1>
					<a className="make-btn" href="make/"><p>+</p>Загрузить</a>
				</div>
				<div className="column-flex"> 
					{/* Передача функции как пропса */}
					<TabsSelect list={this.state.tabs} onChange={this.selectTab}/>
					<div className="w-100 d-flex align-items-center gap-3 select">
						<p>Класс:</p>
						<select>
							{Array.from({ length: 11 }, (_, i) => (
								<option key={i + 1}>{i + 1}</option>
							))}
						</select>
					</div>
					<MaterialsSection list={this.state.list} />
				</div>
			</Container>
		</>;
	}

	selectTab(name, value){
		fetch(HOST + "api/materials/get/",
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({type: value}),
			}
		)
		.then(res => res.json())
		.then(
			(resultLessons) => {
				this.setState(
					{
						list: resultLessons.body
					}
				)
			},
			(error) => {
				
			}
		);
    }
	
	componentDidMount() {
        fetch(HOST + "api/materials/get/", { credentials: 'include' })
            .then(res => res.json())
            .then((resultLessons) => {

                fetch(HOST + "api/get-types/", { credentials: 'include' })
                    .then(res => res.json())
                    .then((resultTabs) => {
                        this.setState({
                            tabs: resultTabs.body,
                            list: resultLessons.body
                        });
                    });
            });
    }
}

export default Materials;