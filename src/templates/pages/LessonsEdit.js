import { Container } from "react-bootstrap";
import { Component } from 'react';
import React from 'react';
import TabsSelect from "../blocks/TabsSelect";
import Input from "../ui/Input";
import {HOST} from '../../Settings';
import Button from "../ui/Button";
import { Navigate } from "react-router-dom";

class LessonsEdit extends Component {
	
	constructor(props) {
        super(props);
		this.state = {
			tabs: []
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onChangeTab = this.onChangeTab.bind(this);
		this.selectClass = this.selectClass.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.fileInputRef = React.createRef();
    }
	
	selectClass(event){
		this.setState({ "class": event.target.value})
    }

	async onSubmit() {
		try {
		// Создаем объект FormData
		const formData = new FormData();
		
		// Добавляем текстовые данные
		formData.append('type', this.state.type);
		formData.append('name', this.state.name_lesson);
		formData.append('target', this.state.target_lesson);
		formData.append('class', this.state.class);
		formData.append('description', this.state.description_lesson);
		if (this.state.file) {
			formData.append('file', this.state.file);
		}
		// Добавляем файл из input
		const fileInput = document.querySelector('input[type="file"]');
		if (fileInput.files[0]) {
			formData.append('file', fileInput.files[0]);
		}
	
		const response = await fetch(HOST + 'api/lessons/make/', {
			method: 'POST',
			credentials: 'include',
			body: formData, // Используем FormData вместо JSON
			// Не нужно указывать Content-Type - браузер сам установит с boundary
		});
	
		if (response.ok) {
			const responseData = await response.json();
			if (responseData.success){
				this.setState({
					"redirectPath": `/person/lessons/detail/?id=${responseData.body.id}`,
				});
			} else {
				alert(responseData.errors[0].name);
			}
			// Можно добавить редирект или уведомление об успехе
		} else {
			alert('Ошибка при отправке формы.');
		}
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Произошла ошибка при отправке формы.');
		}
	}	

	onChangeInput(event){
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	onChangeTab(name, value){
		console.log(name);
		this.setState({
			[name]: value,
		});
	}

	handleFileChange = (e) => {
		this.setState({ file: e.target.files[0] });
	};
	

	render() {
		if (this.state.redirectPath) {
			return <Navigate to={this.state.redirectPath} replace />;
		}
		return <>
			<Container>
				<div className="heading">
					<h1>Редактирование урока</h1>
					<a className="make-btn" href="/person/lessons/">К списку</a>
				</div>
				<div className="column-flex" >
					<TabsSelect list={this.state.tabs} empty="Не выбрано" onChange={this.onChangeTab} name="type"/>
					<div className="w-100 d-flex align-items-center gap-3 select">
						<p>Класс:</p>
						<select onChange={this.selectClass}>
							<option>Не выбран</option>
							{Array.from({ length: 11 }, (_, i) => (
								<option key={i + 1}>{i + 1}</option>
							))}
						</select>
					</div>

					<Input handle={this.onChangeInput} name="name_lesson" label="Тема урока"/>
					<textarea onChange={this.onChangeInput} name="target_lesson" placeholder="Цели и задачи урока..." />
					<textarea onChange={this.onChangeInput} name="description_lesson" placeholder="Описание урока ..." />
					<input
						type="file" 
						onChange={this.handleFileChange}
						ref={this.fileInputRef} // Альтернативный способ доступа к файлу
					/>
					<Button text="Сохранить" onSubmit={() => this.onSubmit()}/>
				</div>

			</Container>
		</>
	};
	
	componentDidMount() {
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
				});
			}
		);
	
	}
}

export default LessonsEdit;