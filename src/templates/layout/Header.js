import "./Header.css"
import Container from 'react-bootstrap/Container';
import Logo from "./Parts/Logo"
import Person from "./Parts/Person"
import { DataConsumer } from './../../DataUserContext';
import PersonalMenu from "./../blocks/PersonalMenu"

const Header = () => {
	return (
		<>
			<PersonalMenu />
			<div className="header">
				<Container>
					<div className="header-menu">
						<Logo></Logo>
						<DataConsumer>
							{({ user, clearData }) => (
								<Person user={user}></Person>
							)}
						</DataConsumer>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Header;