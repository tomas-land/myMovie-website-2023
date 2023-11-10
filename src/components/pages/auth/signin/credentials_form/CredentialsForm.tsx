import React from 'react';
import s from './credentials_form.module.scss';
import PrimaryButton from '@/components/shared/buttons/primary_button/PrimaryButton';
import Link from 'next/link';
const CredentialsForm = () => {
  return (
    <form className={s.cred_form}>
      <div className={s.text_fields}>
        <input className={s.input} type="text" placeholder="username" autoComplete="off" />
        <input className={s.input} type="password" placeholder="password" />
      </div>
      <PrimaryButton label="sign in" />
      <span className={s.signup_ref}>
        Don't have account? <Link href="">Sign up !</Link>
      </span>
    </form>
  );
};

export default CredentialsForm;
