import React from 'react'
import s from '@styles/components/UI/input.module.scss'

interface iInputProps {
  placeholder: string
  maxLength?: number

}

const Input = ({ placeholder, maxLength }: iInputProps) => {
  return (
    <input className={s.input} maxLength={maxLength} placeholder={placeholder}></input>
  )
}

export default Input