import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

function Layout ({ settings}) {
	return (
		<>
			<Header />
			<div className="content">
				<Outlet />
			</div>
			<Footer settings = {settings} />
		</>
	);
}

export default Layout ;
