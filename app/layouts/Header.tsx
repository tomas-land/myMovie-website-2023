'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Squash as Hamburger } from 'hamburger-react'

import s from '@styles/layouts/header.module.scss'

import Logo from '../components/UI/Logo'
import Button from '../components/UI/Button'

const Header = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href="./">
          <Logo />
        </Link>
        <div className={s.btns}>
          <Link href="">
            <Button label="sign in" />
          </Link>
        </div>
          <div className={s.hamburger_wrapper}>
            <Hamburger toggled={isOpen} toggle={setOpen} size={25} rounded />
          </div>
        <div className={s.menu}>
          <div className={s.menu_list}>
            <li className={s.menu_item}>
              <Link href="" className={s.link}> Home </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="/movies" className={s.link}> Movies </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="/tv-shows" className={s.link}> TV Shows </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="/actors" className={s.link}> Actors </Link>
            </li>
            <li className={s.menu_item}>
              <Link href="/more" className={s.link}> More </Link>
            </li>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen ? (<div className={`${s.mobile_menu} ${s.open}`}>
        <div className={s.hamburger_wrapper}>
          <Hamburger toggled={isOpen} toggle={setOpen} size={25} rounded duration={0.9} />
        </div>
        <div className={s.mobile_menu_list}>
          <li className={s.mobile_menu_item}>
            <Link href="./" className={s.link}> Home </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link href="/movies" className={s.link}>Movies </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link href="/tv-shows" className={s.link}> TV Shows </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link href="/actors" className={s.link}> Actors </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link href="/more" className={s.link}> More </Link>
          </li>
        </div>
      </div>)
        : null

      }
    </header>

  )
}

export default Header