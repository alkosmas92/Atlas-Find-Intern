import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IntershipNolink from "./IntershipNolink";
import Checkbox from "../Checkbox/Checkbox";
import SentSearch from "./submitSearch";

const Search = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  const [isChecked1, setIsChecked1] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [value, setvalue] = useState("");
  var new_user;

  var search = ["employer", "title", "posision", "studies", "jobtype"];
  var arrayfalse = [false, false, false, false, false];

  function isEmptyObject(obj) {
    return JSON.stringify(userdata) === "{}" || userdata == null;
  }
  useEffect(() => {
    getData();
    getallData();
  }, []);

  async function getallData() {
    const result = await fetch(`http://localhost:8080/api/all_interships`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserdata(data);
      });
  }

  async function getData(user) {
    switch (user) {
      case "employer":
        new_user = {
          employer: value,
        };
        break;
      case "title":
        new_user = {
          title: value,
        };
        break;
      case "posision":
        new_user = {
          posision: value,
        };
        break;
      case "studies":
        new_user = {
          studies: value,
        };
        break;
      case "jobtype":
        new_user = {
          jobtype: value,
        };
        break;

      default:
      // code block
    }

    console.log(new_user);
    if (new_user != undefined) {
      const result = await fetch(
        `http://localhost:8080/api/all_interships_bycrit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(new_user),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setUserdata(data);
        });
      console.log(userdata);
    }
  }

  return (
    <div className="main">
      <>
        hello
        <div>
          {search.map((user, index) => (
            <div>
              <Checkbox
                key={index}
                name={user}
                Allcheck={isChecked1}
                setChecked={setIsChecked1}
                index={index}
                setvalue={setvalue}
                setUserdata={setUserdata}
                getalldata={getallData}
              />
              {isChecked1[index] === true ? (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      getData(user);
                    }}
                  >
                    <SentSearch
                      key={index + 10}
                      value={value}
                      setvalue={setvalue}
                    />
                    <button type="submit"> Submit </button>
                  </form>
                </div>
              ) : (
                <div>asto</div>
              )}
            </div>
          ))}
        </div>
        <div className="main">
          {!isEmptyObject(userdata) ? (
            <>
              {userdata.map((user) => (
                <div key={user.intership_id}>
                  <IntershipNolink user={user} />
                </div>
              ))}
            </>
          ) : (
            <div>
              <h1> You can do search for... </h1>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Search;
