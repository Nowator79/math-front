import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./templates/layout/Layout";
import Home from "./templates/pages/Home";
import Login from "./templates/pages/Login";
import NoPage from "./templates/pages/NoPage";
import Person from "./templates/pages/Person";
import PersonEdit from "./templates/pages/PersonEdit";
import About from "./templates/pages/About";
import Contacts from "./templates/pages/Contacts";
import Reg from "./templates/pages/Reg";
import Lessons from "./templates/pages/Lessons";
import LessonsMake from "./templates/pages/LessonsMake";
import LessonsEdit from "./templates/pages/LessonsEdit";
import LessonsDetail from "./templates/pages/LessonsDetail";
import Materials from "./templates/pages/Materials";
import MaterialsMake from "./templates/pages/MaterialsMake";
import MaterialsDetail from "./templates/pages/MaterialsDetail";
import React, { Component } from 'react';
import { DataConsumer } from './DataUserContext';
import {HOST} from './Settings';
import TestList from './templates/pages/TestList';
import TestMake from "./templates/pages/TestMake";
import TestDetail from "./templates/pages/TestDetail";
import TestView from "./templates/pages/TestView";


class App extends Component {

	constructor(props) {
        super(props);
		this.state = {
			isLoaded: true,
		};
    }

    render() {
        return (
			<>
				<BrowserRouter>
					<DataConsumer>
						{({ user }) => (
							<Routes>
								<Route path="/" element={<Layout settings={this.state.settings} />}>
									<Route index element={<Home />} />
									<Route path="/login/" element={<Login />} />
									<Route path="/reg/" element={<Reg />} />
									<Route path="/about/" element={<About />} />
									<Route path="/contacts/" element={<Contacts />} />
									<Route path="/person/" element={<Person user={user} />} />
									<Route path="/person/edit/" element={<PersonEdit user={user} />} />
									<Route path='/person/lessons/' element={<Lessons />} />
									<Route path='/person/lessons/make/' element={<LessonsMake />} />
									<Route path='/person/lessons/edit/' element={<LessonsEdit />} />
									<Route path='/person/lessons/detail/' element={<LessonsDetail />} />
									<Route path='/person/materials/' element={<Materials />} />
									<Route path='/person/materials/make/' element={<MaterialsMake />} />
									<Route path='/person/materials/detail/' element={<MaterialsDetail />} />
									<Route path='/person/test/' element={<TestList />} />
									<Route path='/person/test/make/' element={<TestMake />} />
									<Route path='/person/test/detail/' element={<TestDetail />} />
									<Route path='/person/test/detail/view/' element={<TestView />} />
									<Route path="*" element={<NoPage />} />
								</Route>
							</Routes>
						)}
					</DataConsumer>
				</BrowserRouter>
				
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
			</>
		);
    }

	componentDidMount(){

		fetch(HOST + "api/settings/",
			{
				credentials: 'include',
			}
		)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					settings: result.body
				});
			},
			// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
			// чтобы не перехватывать исключения из ошибок в самих компонентах.
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		);

		

		
	}
}

export default App;
