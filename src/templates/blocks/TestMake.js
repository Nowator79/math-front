import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import {HOST} from '../../Settings';

class TestMake extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testTitle: '',
			questions: [
				{
					id: 1,
					text: '',
					answers: [
						{ id: 1, text: '', correct: false }
					]
				}
			]
		};

		if(props.questions && props.title){
			this.state.testTitle = props.title;
			this.state.questions = props.questions;
		}
	}

	handleTestTitleChange = (e) => {
		this.setState({ testTitle: e.target.value });
	};

	handleQuestionTextChange = (questionId, e) => {
		const updatedQuestions = this.state.questions.map(question => {
			if (question.id === questionId) {
				return { ...question, text: e.target.value };
			}
			return question;
		});
		this.setState({ questions: updatedQuestions });
	};

	handleAnswerTextChange = (questionId, answerId, e) => {
		const updatedQuestions = this.state.questions.map(question => {
			if (question.id === questionId) {
				const updatedAnswers = question.answers.map(answer => {
					if (answer.id === answerId) {
						return { ...answer, text: e.target.value };
					}
					return answer;
				});
				return { ...question, answers: updatedAnswers };
			}
			return question;
		});
		this.setState({ questions: updatedQuestions });
	};

	handleCorrectAnswerChange = (questionId, answerId) => {
		const updatedQuestions = this.state.questions.map(question => {
			if (question.id === questionId) {
				const updatedAnswers = question.answers.map(answer => {
					return {
						...answer,
						correct: answer.id === answerId
					};
				});
				return { ...question, answers: updatedAnswers };
			}
			return question;
		});
		this.setState({ questions: updatedQuestions });
	};

	addQuestion = () => {
		const newId = this.state.questions.length > 0
			? Math.max(...this.state.questions.map(q => q.id)) + 1
			: 1;

		this.setState(prevState => ({
			questions: [
				...prevState.questions,
				{
					id: newId,
					text: '',
					answers: [
						{ id: 1, text: '', correct: false }
					]
				}
			]
		}));
	};

	removeQuestion = (questionId) => {
		this.setState(prevState => ({
			questions: prevState.questions.filter(q => q.id !== questionId)
		}));
	};

	addAnswer = (questionId) => {
		this.setState(prevState => ({
			questions: prevState.questions.map(question => {
				if (question.id === questionId) {
					const newAnswerId = question.answers.length > 0
						? Math.max(...question.answers.map(a => a.id)) + 1
						: 1;

					return {
						...question,
						answers: [
							...question.answers,
							{ id: newAnswerId, text: '', correct: false }
						]
					};
				}
				return question;
			})
		}));
	};

	removeAnswer = (questionId, answerId) => {
		this.setState(prevState => ({
			questions: prevState.questions.map(question => {
				if (question.id === questionId) {
					const filteredAnswers = question.answers.filter(a => a.id !== answerId);
					// Если удаляем правильный ответ, сбрасываем выбор
					const wasCorrectRemoved = question.answers.find(a => a.id === answerId)?.correct;
					const updatedAnswers = wasCorrectRemoved
						? filteredAnswers.map(a => ({ ...a, correct: false }))
						: filteredAnswers;

					return {
						...question,
						answers: updatedAnswers
					};
				}
				return question;
			})
		}));
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			title: this.state.testTitle,
			questions: this.state.questions
		};

		if(this.props.test_id){
			try {
				formData.id = this.props.test_id;
				const response = await fetch(HOST + "api/tests/edit/", {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					alert('Тест успешно сохранен!');
				
				} else {
					alert('Ошибка при сохранении теста');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('Произошла ошибка при отправке данных');
			}
		}else{
			try {
				const response = await fetch(HOST + "api/tests/make/", {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					alert('Тест успешно сохранен!');
				
				} else {
					alert('Ошибка при сохранении теста');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('Произошла ошибка при отправке данных');
			}
		}
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Название теста</Form.Label>
					<Form.Control
						type="text"
						value={this.state.testTitle}
						onChange={this.handleTestTitleChange}
						placeholder="Введите название теста"
						required
					/>
				</Form.Group>

				{this.state.questions.map((question, qIndex) => (
					<div key={question.id} className="question-block mb-4 p-3 border rounded">
						<Row className="mb-2">
							<Col>
								<Form.Label>Вопрос #{qIndex + 1}</Form.Label>
							</Col>
							<Col className="text-end">
								<Button
									variant="danger"
									size="sm"
									onClick={() => this.removeQuestion(question.id)}
									disabled={this.state.questions.length <= 1}
								>
									Удалить вопрос
								</Button>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								value={question.text}
								onChange={(e) => this.handleQuestionTextChange(question.id, e)}
								placeholder="Введите текст вопроса"
								required
							/>
						</Form.Group>

						<h6>Варианты ответов:</h6>
						{question.answers.map((answer, aIndex) => (
							<div key={answer.id} className="answer-row mb-2">
								<Row>
									<Col xs={8}>
										<Form.Control
											type="text"
											value={answer.text}
											onChange={(e) => this.handleAnswerTextChange(question.id, answer.id, e)}
											placeholder={`Вариант ответа ${aIndex + 1}`}
											required
										/>
									</Col>
									<Col xs={2} className="d-flex align-items-center">
										<Form.Check
											type="radio"
											name={`correct-answer-${question.id}`}
											checked={answer.correct}
											onChange={() => this.handleCorrectAnswerChange(question.id, answer.id)}
											label="Правильный"
										/>
									</Col>
									<Col xs={2} className="d-flex align-items-center">
										<Button
											variant="outline-danger"
											size="sm"
											onClick={() => this.removeAnswer(question.id, answer.id)}
											disabled={question.answers.length <= 1}
										>
											Удалить
										</Button>
									</Col>
								</Row>
							</div>
						))}

						<Button
							variant="outline-primary"
							size="sm"
							onClick={() => this.addAnswer(question.id)}
							className="mt-2"
						>
							Добавить вариант ответа
						</Button>
					</div>
				))}

				<div className="d-flex justify-content-between mb-4">
					<Button variant="success" onClick={this.addQuestion}>
						Добавить вопрос
					</Button>

					<Button variant="primary" type="submit">
						Сохранить тест
					</Button>
				</div>
			</Form>
		);
	}
}

export default TestMake;