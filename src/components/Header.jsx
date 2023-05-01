import headerLogo from "../images/header-logo.svg";
import {Link, useNavigate} from "react-router-dom";

function Header({redirectLink, redirectLinkText, loggedIn, onSignOut, userEmail = ''}) {

  return (
    <header className="header">
      <img src={headerLogo} alt="Лого" className="header__logo"/>
      <div className="header__right">
        <p className="header__info">{userEmail}</p>
        <Link onClick={loggedIn ? onSignOut : undefined}
              className={`header__link link-opacity${loggedIn ? ' header__link_text_dim' : ''}`}
              to={redirectLink}>{redirectLinkText}</Link>
      </div>
    </header>
  )
}

export default Header
