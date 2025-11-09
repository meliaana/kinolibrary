import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { Fieldset } from '../Fieldset';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('/api/login?useCookies=true', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // const data = await response.json();
      // console.log('Login success:', data);
      navigate('/client/orders');
      // optionally store token if rememberMe is true
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className={styles.formFields} onSubmit={handleSubmit}>
      <Fieldset label="Email" value={email} onChange={setEmail} />
      <Fieldset label="Password" value={password} onChange={setPassword} />
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
