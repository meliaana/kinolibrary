import { useState } from 'react';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { Fieldset } from '../Fieldset';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <form className={styles.formFields}>
      <Fieldset label="Email" value="" onChange={() => {}} />
      <Fieldset label="Password" value="" onChange={() => {}} />
      <div className={styles.rememberMeContainer}>
        <CheckBox
          label="Keep me logged in"
          value={rememberMe}
          onChange={setRememberMe}
        />
        <a href="#" className={styles.forgotPasswordButton}>
          Forgot password?
        </a>
      </div>
      <Button type="submit" className={styles.submitButton}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
