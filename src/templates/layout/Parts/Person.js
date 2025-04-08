import { ReactComponent as PersonSvg } from './person.svg';
import "./Person.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Person = ({user}) => {
	const navigate = useNavigate();
	const location = useLocation();
	
	useEffect(() => {
		if (location.pathname === '/login/' && user) {
			navigate('/person/');
		}
	}, [location, navigate, user]);
	if(user){
		return <a className="person" href="/person/">
			<PersonSvg />
			<p className='person-name'>{user.NAME}</p>
		</a>
	}else{
		return <a className='person' href="/login/">
			Войти
		</a>
	}

}

export default Person;