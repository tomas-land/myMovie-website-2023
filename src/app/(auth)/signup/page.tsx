import s from '@/components/pages/auth/signup/signup_page.module.scss';
import GoogleSigninButton from '@/components/pages/auth/google_signin_button/GoogleSigninButton';
import CredentialsForm from '@/components/pages/auth/signup/credentials_form/CredentialsForm';

const SignUpPage = () => {
  return (
    <div>
      <div className={s.signup_page}>
        <div className={s.container}>
          <h1 className={s.title}>Sign up</h1>
          <GoogleSigninButton />
          <div className={s.divider}>
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <CredentialsForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
