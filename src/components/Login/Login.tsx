import { LoginForm } from '../LoginForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1 className={styles.title}>Sign In</h1>
        <p>Please enter your email and password to continue.</p>
        <LoginForm />
      </div>
      <div className={styles.welcome}>
        <span>Welcome Back!</span>
        <p>Login to save and download clips</p>
      </div>
    </div>
  );
};

export default Login;
