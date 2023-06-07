import React from 'react'

interface iButtonProps {
  text: string

}

const Button = ({ text }: iButtonProps) => {
  return (
    <button>{text}</button>
  )
}

export default Button