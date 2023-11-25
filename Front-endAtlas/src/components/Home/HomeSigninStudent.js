import CheckStudent from "./signinStudent";
import "../../style/signin.css";
const SigninStudent = () => {
  return (
    <div className="MainSignin">
      <div className="Signin">
        <h2>Students</h2>
        <CheckStudent />
      </div>
    </div>
  );
};

export default SigninStudent;
