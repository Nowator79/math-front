import "./Logo.css"
import { ReactComponent as LogoIcon } from '../../../images/logo-site.svg';

const Logo = () => 	{
	return <div>
		<a href="/" className='logo'>
			<LogoIcon className="logo-icon"/>
			<p className="logo-text">Мастерская <br></br>
			знаний</p>
		</a>
	</div>
};

export default Logo;