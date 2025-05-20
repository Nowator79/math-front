import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainBanner from "../blocks/MainBanner";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Редирект при загрузке компонента
		// navigate('/login/');
	}, [navigate]);

	return (
		<>
			<Container>
				<div className="heading">
					<h1>Мастерская знаний</h1>
				</div>
			</Container>
			<MainBanner/>
		</>

	);
};

export default Home;