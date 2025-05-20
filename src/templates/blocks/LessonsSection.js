import { Component } from 'react';
import './LessonsSection.css';

class LessonsSection extends Component {

	constructor(props) {
	
        super(props);
    }

	render() {
		if(this.props.list){
			this.props.list.forEach(item => {
				item.HREF = "/person/lessons/detail/?id=" + item.ID;
			});
		} else {
			return <h3>Пока нет уроков</h3>
		}
		return (
			<div className='list-lessons'>
				{
					this.props.list.map((item, index) => (
						<a href={item.HREF} className='list-lessons--item' key={index}>
							<p className='name'>
								{item.NAME}
							</p>
							<p className='description'>
								{item.DESCRIPTION}
							</p>
						</a>
					))
				}
			</div>
		);
	}
}

export default LessonsSection;