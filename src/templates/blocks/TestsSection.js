import { Component } from 'react';
import './TestsSection.css';

class TestsSection extends Component {

	render() {
		if(this.props.list){
			this.props.list.forEach(item => {
				item.HREF = "/person/test/detail/?id=" + item.ID;
				item.HREF_VIEW = "/person/test/detail/view/?id=" + item.ID;
			});
		}else{
			return <h3>Тестов нет</h3>
		}

		return (
			<div className='list-tests'>
				{
					this.props.list.map((item, index) => (
						<div className='list-tests--item' key={index}>
							<p className='name'>
								{item.NAME}
							</p>
							<p className='description'>
								Предмет: {item.NAME_TYPE}
							</p>
							<div className='list-tests--item-links'>
								<a href={item.HREF}>Редактировать</a>
								<a href={item.HREF_VIEW}>Пройти</a>
							</div>
						</div>
					))
				}
			</div>
		);
	}
}

export default TestsSection;