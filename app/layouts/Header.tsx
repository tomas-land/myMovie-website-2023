import s from '@styles/layuots/header.module.scss'
import Logo from '../components/UI components/Logo'
import Button from '../components/UI components/Button'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />

      </div>
    </header>

  )
}

export default Header