import { Wrapper, StyleImg } from "../../style/intership";
import { Link } from "react-router-dom";

const Internship = (props) => {
  const {
    employer,
    file,
    flag_online,
    flag_save,
    for_company_id,
    infocomp,
    infointer,
    intership_id,
    jobtype,
    posision,
    postdate,
    salary,
    startdate,
    studies,
    title,
  } = props.user;

  console.log("props", props.user);

  return (
    <div className="Nolink" key={intership_id}>
      <nav>
        <ul>
          <div className="main">
            <li>
              <p>Employer {employer}</p>
            </li>
            <li>
              <p>Company {infocomp}</p>
            </li>
            <li>
              <p>Info internship {infointer}</p>
            </li>
            <li>
              <p>Jobtype {jobtype}</p>
            </li>
            <li>
              <p>Posision {posision}</p>
            </li>
            <li>
              <p>salary {salary}</p>
            </li>
            <li>
              <p>Title {title}</p>
            </li>
            <li>
              <p>Start date {startdate}</p>
            </li>
            <li>
              <p>Post date {postdate}</p>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Internship;
