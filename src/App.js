// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./templates/layout/Layout";
import Home from "./templates/pages/Home";
import Login from "./templates/pages/Login";
import NoPage from "./templates/pages/NoPage";
import Person from "./templates/pages/Person";
import React, { Component } from 'react';
import {HOST} from './Settings';

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
					<Routes>
						<Route path="/" element={<Layout settings={this.state.settings} />}>
							<Route index element={<Home />} />
							<Route path="/login/" element={<Login />} />
							<Route path="/person/" element={<Person />} />
							<Route path="*" element={<NoPage />} />
						</Route>
					</Routes>
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
		)
	}
}

export default App;
