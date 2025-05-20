
import { Component } from 'react';
import './LinksBlock.css';

class LinksBlock extends Component {

	render() {
		return (
			<div className="block-links">
				<a className='link-chrome-fuck' href="/person/lessons/">
					<span>Уроки</span>
					<img alt='Уроки' src={require('./../../images/lessens.png')}/>
				</a>
				<a className='link-chrome-fuck' href="/person/materials/">
					<span>Материалы</span>
					<img alt='Материалы' src={require('./../../images/materials.png')}/>
				</a>
				<a className='link-chrome-fuck' href="/person/test/">
					<span>Задания</span>
					<img alt='Задания' src={require('./../../images/test.png')}/>
				</a>
			</div>

		);
	}
}

export default LinksBlock;