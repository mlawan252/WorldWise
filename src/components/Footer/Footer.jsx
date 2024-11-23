import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyrighy {new Date().getFullYear()} by Worldwise Inc
      </p>
    </footer>
  );
}
