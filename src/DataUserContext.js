import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import {HOST} from './Settings';
import { useNavigate, useLocation } from 'react-router-dom';

// Создаем контекст с начальным значением (может быть любым)
const DataContext = React.createContext({
	data: null,
	setData: () => {}, // Пустая функция по умолчанию
	clearData: () => {} // Дополнительный метод
});

export class DataUserProvider extends React.Component {
	constructor(props) {
		super(props);
		var user = false;
		this.state = {
			user: user
		};
	}

	setData = (user) => {
		this.setState({ user });
	};

	clearData = () => {
		this.setState({ user: null });
	};

	logout = () => {
		var dataUser = this;

		fetch(HOST + 'api/user/logout/', {
			method: 'POST',
			credentials: 'include',
		}).then((response => {
			dataUser.clearData();
		}));
	};

	render() {
		return (
			<DataContext.Provider
				value={{
					user: this.state.user,
					setData: this.setData,
					clearData: this.clearData,
					logout: this.logout
				}}
			>
				{this.props.children}
			</DataContext.Provider>
		);
	}

	
	
	componentDidMount() {
		fetch(HOST + "api/user/get/",
			{
				credentials: 'include',
			}
		)
		.then(res => res.json())
		.then(
			(result) => {
				this.setData(
					result.body
				);
			},
		);
	}
}

// Экспортируем сам контекст и потребитель
export const DataConsumer = DataContext.Consumer;

// Хук для удобного использования
export function useData() {
	return useContext(DataContext);
}