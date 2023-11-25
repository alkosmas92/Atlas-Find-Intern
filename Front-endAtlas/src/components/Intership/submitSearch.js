import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../style/menu.css";

const SentSearch = (props) => {
  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="FormStyle">
      <div className="Label">
        <label htmlFor="Label">
          <input
            id="value"
            value={props.value}
            placeholder="value"
            onChange={(e) => props.setvalue(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default SentSearch;
