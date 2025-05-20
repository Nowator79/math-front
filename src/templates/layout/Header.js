import "./Header.css"
import Container from 'react-bootstrap/Container';
import Logo from "./Parts/Logo"
import Person from "./Parts/Person"
import { DataConsumer } from './../../DataUserContext';
import PersonalMenu from "./../blocks/PersonalMenu"

const Header = () => {
	return (
		<DataConsumer>
			{({ user }) => (
				<>
					<PersonalMenu user={user} />
					<div className="header">
						<Container>
							<div className="header-menu">
								<Logo></Logo>
							
										<Person user={user}></Person>
								
							</div>
						</Container>
					</div>
				</>
			)}
		</DataConsumer>
	);
};

export default Header;