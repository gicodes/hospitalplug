import styles from "../page.module.css";

const CustomLogo = () => {
  return (
    <div className={styles.logo}>
      <span className='txt-wheat'>Hospital</span> 
      <span>🔌</span> 
      <span className='txt-secondary'>Plug</span>
    </div>
  );
}

export default CustomLogo;