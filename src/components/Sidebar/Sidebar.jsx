import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import styles from "./Sidebar.module.css";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
