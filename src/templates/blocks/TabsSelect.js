import { Component } from 'react';
import './TabsSelect.css';

class TabsSelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: props.list || []
		};
	}

	render() {
		var list = Array.from(this.state.list);
		var hasSelected = false;
		list.forEach(item => {
			if(item.SELECT){
				hasSelected = true;
			}
		});

		if (list){
			var nameEmpty = "Все";
			if (this.props.empty){
				nameEmpty = this.props.empty;
			}
			list.unshift({
				"NAME": nameEmpty,
				"SELECT": !hasSelected,
			});

			list.forEach(item => {
				item.CLASSES = ["tab-select--item"];
				if(item.SELECT){
					item.CLASSES.push("active");
				}
			});
		}

		return (
		<div className='tab-select'>
			{list 
			? list.map((item, index) => (
				<button onClick={() => this.buttonClickHandler(item)} className={item.CLASSES.join(" ")} key={index}>
					{item.NAME}
				</button>
				))
			: null
			}
		</div>
		);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.list !== this.props.list) {
			this.setState({ list: this.props.list });
		}
	}

	buttonClickHandler(buttonItem) {
		var list = this.state.list;
		list.map((item) => {
			item.SELECT = false;
		});
		buttonItem.SELECT = true;
		if(this.props.onChange){
			this.props.onChange(this.props.name, buttonItem.ID);
		}

		this.setState(list);
	}
}

export default TabsSelect;