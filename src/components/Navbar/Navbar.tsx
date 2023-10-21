import { Dispatch, SetStateAction } from "react";
import "./Navbar.scss";

type theme = "light" | "dark" | "system";
interface NavbarProps {
  themeColor: theme;
  setThemeColor: Dispatch<SetStateAction<theme>>;
}

const Navbar: React.FC<NavbarProps> = ({ setThemeColor, themeColor }) => {
  const navbarClasses: {
    container: string;
  } = {
    container: "navbarContainer" + " " + themeColor,
  };

  return (
    <div className={navbarClasses.container}>
      <h1>Hello from Navbar</h1>
    </div>
  );
};

export default Navbar;
