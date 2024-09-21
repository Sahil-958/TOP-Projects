//import logoLight from '../assets/logo_light_32.svg';
import logoDark from "../assets/logo_dark_32.svg";
import  * as icons from "@heroicons/react/24/solid";

export default function SideBar() {
  return (
    <>
      {/*<img src={logoLight} alt="logo" />*/}
      <div className="sideBar">
        <img src={logoDark} alt="logo" width={32} />
        <icons.HomeIcon className="icon size-8" />

      </div>
    </>
  );
}
