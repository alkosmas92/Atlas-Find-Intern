import "../../style/menu.css";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>
              <span className="fas fa-code" aria-hidden="true">
                {" "}
                <header>
                  <Link to="/"> Atlas</Link>
                </header>
              </span>
            </h1>
          </li>
          <Link to="/login/Student">
            <li>Students</li>
          </Link>
          <Link to="/login/Company">
            <li>Company</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
