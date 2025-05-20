import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Quiz.css";

class Quiz extends Component {
	static propTypes = {
		questions: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				question: PropTypes.string.isRequired,
				answers: PropTypes.arrayOf(
					PropTypes.shape({
						id: PropTypes.number.isRequired,
						text: PropTypes.string.isRequired,
						correct: PropTypes.bool.isRequired
					})
				).isRequired
			})
		).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			currentQuestionIndex: 0,
			selectedAnswers: {},
			score: 0,
			quizCompleted: false,
			showResults: false
		};
	}

	handleAnswerSelect = (questionId, answerId) => {
		this.setState(prevState => ({
			selectedAnswers: {
				...prevState.selectedAnswers,
				[questionId]: answerId
			}
		}));
	};

	handleNextQuestion = () => {
		this.setState(prevState => {
			const nextIndex = prevState.currentQuestionIndex + 1;
			const quizCompleted = nextIndex >= this.props.questions.length;
			
			return {
				currentQuestionIndex: quizCompleted ? prevState.currentQuestionIndex : nextIndex,
				quizCompleted
			};
		});
	};

	handlePrevQuestion = () => {
		this.setState(prevState => ({
			currentQuestionIndex: Math.max(0, prevState.currentQuestionIndex - 1)
		}));
	};

	calculateScore = () => {
		let score = 0;
		this.props.questions.forEach(question => {
			const selectedAnswerId = this.state.selectedAnswers[question.id];
			if (selectedAnswerId) {
				const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
				if (selectedAnswer && selectedAnswer.correct) {
					score++;
				}
			}
		});
		return score;
	};

	handleSubmit = () => {
		const score = this.calculateScore();
		this.setState({
			score,
			showResults: true
		});
	};

	handleRestart = () => {
		this.setState({
			currentQuestionIndex: 0,
			selectedAnswers: {},
			score: 0,
			quizCompleted: false,
			showResults: false
		});
	};

	renderQuestion = (question) => {
		const { selectedAnswers } = this.state;
		const selectedAnswerId = selectedAnswers[question.id];

		return (
		<div key={question.id} className="question-container">
			<h3 className="question-text">{question.text}</h3>
			<div className="answers-list">
			{question.answers.map(answer => (
				<div 
					key={answer.id} 
					className={`answer-item ${selectedAnswerId === answer.id ? 'selected' : ''}`}
					onClick={() => this.handleAnswerSelect(question.id, answer.id)}
				>
				{answer.text}
				{this.state.showResults && (
					<span className="answer-status">
					{answer.correct ? ' ✓' : ' ✗'}
					</span>
				)}
				</div>
			))}
			</div>
		</div>
		);
	};

	renderResults = () => {
		const { questions } = this.props;
		const { score, selectedAnswers } = this.state;
		const totalQuestions = questions.length;

		return (
		<div className="results-container">
			<h2>Результаты теста</h2>
			<p>Вы ответили правильно на {score} из {totalQuestions} вопросов</p>
			<p>Процент правильных ответов: {Math.round((score / totalQuestions) * 100)}%</p>
			
			<div className="detailed-results">
				{questions.map(question => (
					<div key={question.id} className="question-result">
						<h4>{question.question}</h4>
						<p>
							Ваш ответ: {
							question.answers.find(a => a.id === selectedAnswers[question.id])?.text || 'Нет ответа'
							}
						</p>
						<p className="correct-answer">
							Правильный ответ: {
							question.answers.find(a => a.correct)?.text
							}
						</p>
					</div>
				))}
			</div>
			
			<button className="restart-button" onClick={this.handleRestart}>
				Пройти тест снова
			</button>
		</div>
		);
	};

	render() {
		const { questions } = this.props;
		const { currentQuestionIndex, quizCompleted, showResults } = this.state;

		if (showResults) {
			return this.renderResults();
		}

		if (questions.length === 0) {
			return <div>Нет вопросов для отображения</div>;
		}

		const currentQuestion = questions[currentQuestionIndex];

		return (
			<div className="quiz-container">
				<div className="quiz-header">
					<div className="progress">
						Вопрос {currentQuestionIndex + 1} из {questions.length}
					</div>
				</div>

				{this.renderQuestion(currentQuestion)}

				<div className="navigation-buttons">
				<button 
					onClick={this.handlePrevQuestion}
					disabled={currentQuestionIndex === 0}
				>
					Назад
				</button>
				
				{!quizCompleted ? (
					<button 
						onClick={this.handleNextQuestion}
						disabled={!this.state.selectedAnswers[currentQuestion.id]}
					>
					Следующий вопрос
					</button>
				) : (
					<button 
						onClick={this.handleSubmit}
						disabled={Object.keys(this.state.selectedAnswers).length < questions.length}
					>
						Завершить тест
					</button>
				)}
				</div>
			</div>
		);
	}
}

export default Quiz;