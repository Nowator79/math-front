import React from 'react';
import Cookies from 'js-cookie';

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
		// var userJson = Cookies.get("user");
		// try{
		// 	if (userJson) {
		// 		user = JSON.parse(userJson);
		// 	}
		// }catch{
		// 	Cookies.remove("user")
		// }
		this.state = {
			user: user
		};
	}

	setData = (user) => {
		this.setState({ user });
		// Cookies.set("user", JSON.stringify(user), { 
		// 	expires: 7, // срок жизни в днях
		// 	path: '/',
		// 	secure: true,
		// 	sameSite: 'strict'
		// });
	};

	clearData = () => {
		this.setState({ data: null });
	};

	render() {
		return (
			<DataContext.Provider
				value={{
					user: this.state.user,
					setData: this.setData,
					clearData: this.clearData
				}}
			>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

// Экспортируем сам контекст и потребитель
export const DataConsumer = DataContext.Consumer;