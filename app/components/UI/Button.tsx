import React from 'react'
import s from '@styles/components/UI/button.module.scss'

interface iButtonProps {
  label: string
  position?: 'relative' | 'absolute';
}

const Button = ({ label, position }: iButtonProps) => {
  const style = {
    position: position,
  };

  return (
    <button className={s.button} style={style}>
      <span className={s.text_gradient}>{label}</span>
    </button>
  )
}

export default Button