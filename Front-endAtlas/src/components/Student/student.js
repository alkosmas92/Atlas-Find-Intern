import { Link } from "react-router-dom";

const Student = (props) => {
  const {
    student_id,
    username,
    password,
    firstname,
    lastname,
    grade,
    university,
    year,
    email,
    telephone,
  } = props.user;

  return (
    <nav>
      <ul>
        <div className="main">
          <div key={props.user.student_id}>
            <div>
              <p>student_id{props.user.student_id}</p>
              <p>username{props.username}</p>
              <p>firstname {props.firstname}</p>
              <p>lastname {props.lastname}</p>
              <p>grade {props.grade}</p>
              <p>university {props.university}</p>
              <p>year {props.year}</p>
              <p>email {props.email}</p>
              <p>telephone {props.telephone}</p>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Student;
