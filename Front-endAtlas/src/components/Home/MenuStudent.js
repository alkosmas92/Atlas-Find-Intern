import "../../style/menu.css";
import { Link } from "react-router-dom";

const MenuStudent = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>
              <span className="fas fa-code" aria-hidden="true">
                {" "}
                <header>
                  <Link to={`/${props.id}/GetAllInterships`}>
                    {" "}
                    Atlas Student {props.username}
                  </Link>
                </header>
              </span>
            </h1>
          </li>
          <Link to={`/Students/GetRequestedInterships/${props.id}`}>
            <button className="button"> Requested </button>
          </Link>
          <Link to={`/Students/GetAcceptedInterships/${props.id}`}>
            <button className="button"> Accepted </button>
          </Link>
          <Link to={`/Students/GetRejectedInterships/${props.id}`}>
            <button className="button"> Rejected </button>
          </Link>
          <Link to={`/Students/GetSavedInterships/${props.id}`}>
            <button className="button"> Saved </button>
          </Link>
          <Link to={`/Students/GetMatchedInterships/${props.id}`}>
            <button className="button"> Matched </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default MenuStudent;
