import "./Header.css"
import Container from 'react-bootstrap/Container';
import Logo from "./Parts/Logo"
import Person from "./Parts/Person"

const Header = () => {
	return (
		<div className="header">
			<Container>
				<div className="header-menu">
					<Logo></Logo>
					<Person></Person>
				</div>
			</Container>
		</div>
	);
};

export default Header;