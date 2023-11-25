import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const DeleteStudent = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userdata, setUserdata] = useState({});
  const isMounted = useRef(false);
  const [count, setCount] = useState(0);

  // const { from } = location.state;
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    deleteStudent();
    console.log("componentDidUpdateFunction");
  });

  async function deleteStudent() {
    const result = await fetch(
      `http://localhost:8080/api/deletestudent/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }

  return (
    <div className="main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div>
            <div>Hello i am userdata with this userdataname:</div>
            <div>Hello i am userdata with this userdataname:</div>
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              Click Me
            </button>
            {/*<button type="submit" onClick={setCount(1)}> Information</button>*/}
            {/*</Link>*/}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteStudent;
