import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <div>
        <span>TO DO/</span>
        <Link to={"/"}> Home</Link>
      </div>
    </nav>
  );
};
