import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

function Landing() {

    return (
        <div>
            <div>Landing</div>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Sign Up
                    </Link>
                </li>
            </div>
        </div>
    )
};

export default Landing;