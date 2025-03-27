import "./Logo.css"
const Logo = () => 	{
	return <div>
		<a href="/" className='logo'>
			<img className="logo-icon" src={require('./logo.png')}></img>
			<p className="logo-text">Мастерская <br></br>
			знаний</p>
		</a>
	</div>
};

export default Logo;