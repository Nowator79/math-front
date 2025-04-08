import { Container } from 'react-bootstrap';
import './Footer.css';
import { ReactComponent as PhoneSvg } from './../../images/phone-footer-icon.svg';
import { ReactComponent as MailSvg } from './../../images/mail-footer-icon.svg';

const Footer = ({settings}) => {
	var phoneLink, mailLink;
	if (settings) {
		phoneLink = "tel:" + settings.PHONE;
		mailLink = "mailto:" + settings.EMAIL;
	}
	return <div className="footer">
		<Container>
		{settings ? (
			<>
				<h2>
					{settings.NAME_SITE}
				</h2>
				<h3>
					Создавайте и делитесь материалами по урокам <br></br>с коллегами и учениками
				</h3>

				<div className="footer-content">
					<div className="footer-contacts">
						<a href = {phoneLink} > <PhoneSvg /><span>{settings.PHONE}</span></a>
						<a href = {mailLink} > <MailSvg /><span>{settings.EMAIL}</span></a>
					</div>

					<div className='footer-menu-block'>
						<div className='footer-menu'>
							<p>Новым пользователям</p>
							<ul>
								<li><a href="/contacts/">Контакты</a></li>
								<li><a href="/about/">О нас</a></li>
								{/* <li><a href="">Отзывы</a></li> */}
							</ul>
						</div>
						<div className='footer-menu'>
							<p>Пользователям</p>
							<ul>
								<li><a href="">Уроки</a></li>
								<li><a href="">Статистика</a></li>
							</ul>
						</div>
					</div>
				</div>
				
				<div className='footer-under-text'>
					<p>© 2025, «Мастерская математики» </p>
				</div>
			</>
		) : (
			<p>Загрузка...</p>
		)}
			
		</Container>
	</div>;
};

export default Footer;