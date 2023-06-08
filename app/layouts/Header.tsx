import Link from 'next/link'

import s from '@styles/layouts/header.module.scss'
import Logo from '../components/UI components/Logo'
import Button from '../components/UI components/Button'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="./">
          <Logo />
        </Link>
        <div className={s.btns}>
          <Link href="">
            <Button label="sign-in" />
          </Link>
        </div>
        <div className={s.menu}>
          <div className={s.menu_list}>
            <li className={s.menu_item}>
              <Link href="./" className={s.link}> Home </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="" className={s.link}> Movies </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="" className={s.link}> TV Shows </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="" className={s.link}> Actors </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="" className={s.link}> More </Link>
            </li>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header