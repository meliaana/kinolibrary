import { useApiFetch } from '@/hooks/useApiFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { Fieldset } from '../Fieldset';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const apiFetch = useApiFetch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await apiFetch(
        '/api/login?useCookies=true',
        {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
        true, // suppress redirect
      );

      navigate('/client');
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your email and password',
      });
    }
  }

  return (
    <form className={styles.formFields} onSubmit={handleSubmit}>
      <Fieldset
        required
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        autoComplete="email"
      />
      <Fieldset
        required
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        autoComplete="current-password"
      />
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
