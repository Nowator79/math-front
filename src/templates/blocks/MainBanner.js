import { Component } from 'react';
import './MainBanner.css';
import { Container } from 'react-bootstrap';

class MainBanner extends Component {
	
	render() {
		return (
			<div className='main-page-banner'>
				<Container>
					<div className='column-flex content-block'>
						<h2>Управляйте своими учебными материалами легко и эффективно!</h2>
						<p>“Мастерская знаний” – это удобная платформа для хранения и организации всех ваших учебных материалов. Создавайте интерактивные задания и планируйте уроки в одном месте!</p>
						<a href="/login/" className='button-href violet fit'>Начать создавать!</a>
					</div>
				</Container>
			</div>
		);
	}
}

export default MainBanner;