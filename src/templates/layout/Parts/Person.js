import { ReactComponent as PersonSvg } from './person.svg';
import "./Person.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useData } from './../../../DataUserContext';

const Person = ({user}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const context = useData();
	useEffect(() => {
		if (location.pathname === '/login/' && user) {
			navigate('/person/');
		}
	}, [location, navigate, user]);

	if(user){
		return (
			<div className='login-bock'>
				<a className="person" href="/person/">
					<PersonSvg />
					<p className='person-name'>{user.NAME}</p>
				</a>
				<a className='person' onClick={context.logout}>
					<p className='person-name'>
						Выйти
					</p>
				</a>
			</div>
		)
	}else{
		return (
			<div className='login-bock'>
				<a className='person' href="/reg/">
					Регистрация
				</a>
				<a className='person' href="/login/">
					Войти
				</a>
			</div>
		)
	}
}

export default Person;