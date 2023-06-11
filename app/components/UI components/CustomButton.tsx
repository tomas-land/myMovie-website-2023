import React from 'react'
import s from '@styles/UI_components/button.module.scss'

interface iButtonProps {
  label: string

}

const Button = ({ label }: iButtonProps) => {
  return (
    <button className={s.button}><span className={s.text_gradient}>{label}</span></button>
  )
}

export default Button