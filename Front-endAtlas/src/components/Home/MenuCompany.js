import "../../style/menu.css";
import { Link } from "react-router-dom";

const MenuCompany = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>
              <span className="fas fa-code" aria-hidden="true">
                {" "}
                <header>
                  <Link to={`/company/${props.id}`}> Atlas</Link>
                  Company {props.username}
                </header>
              </span>
            </h1>
          </li>
          <Link to={`/company/${props.id}/createintership`}>
            <button className="button"> Create Intership </button>
          </Link>
          <Link to={`/api/request_company_intership/${props.id}`}>
            <button className="button"> Request </button>
          </Link>
          <Link to={`/Company/GetOnlineInterships/${props.id}`}>
            <button className="button"> Online </button>
          </Link>
          <Link to={`/Company/GetSavedInterships/${props.id}`}>
            <button className="button"> Saved </button>
          </Link>
          <Link to={`/Company/GetMathedInterships/${props.id}`}>
            <button className="button"> Matched </button>
          </Link>
          <Link to={`/Company/GetWaitedInterships/${props.id}`}>
            <button className="button"> Waited </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default MenuCompany;
