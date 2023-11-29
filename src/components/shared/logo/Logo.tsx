import React from 'react'
import s from './logo.module.scss'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className={s.logo}>
      <Image className={s.image} src="/logo.svg" alt="logo" fill/>
      </div>
  )
}

export default Logo