import { useState, useEffect } from "react";
import Internship from "./Intership/intership";
import IntershipNolink from "./Intership/IntershipNolink";
import Search from "./Intership/search";
import "../style/searcinternship.css";

const SearchAndInternship = () => {
  const [userdata, setUserdata] = useState({});
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  useEffect(() => {}, []);

  return (
    <div className="main">
      <Search userdata={userdata} setUserdata={setUserdata} />
      {!isEmptyObject(userdata) ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              {userdata.map((user) => (
                <div key={user.intership_id} className="infoadmin">
                  <Internship
                    user={user}
                    url={id.concat(
                      "GetAllInterships".concat(user.intership_id)
                    )}
                  />
                  <button type="submit">
                    {" "}
                    Information {user.intership_id}
                  </button>
                </div>
              ))}
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1> </h1>
        </div>
      )}
    </div>
  );
};

export default SearchAndInternship;
