import { ReactComponent as PersonSvg } from './person.svg';
import "./Person.css";

const Person = ({user}) => {
	if(user){
		return <a className="person" href="/person/">
			<PersonSvg />
			<p className='person-name'>Новоселов Вадим</p>
		</a>
	}else{
		return <a className='person' href="/login/">
			Войти
		</a>
	}

}

export default Person;