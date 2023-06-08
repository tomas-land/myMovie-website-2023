import Link from 'next/link'

import s from '@styles/layuots/header.module.scss'
import Logo from '../components/UI components/Logo'
import Button from '../components/UI components/Button'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />
        <div className={s.btns}>
          <Link href="">
            <Button label="sign-in" />
          </Link>
        </div>
        {/* menu */}
      </div>
    </header>

  )
}

export default Header