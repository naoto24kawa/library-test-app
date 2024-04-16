import classnames from 'classnames'
import React from 'react'

export type DefaultButtonProps = {
  type: 'submit' | 'button' | 'reset'
  className?: string | string[] | object
  label?: string
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export const DefaultButton: React.FunctionComponent<DefaultButtonProps> = ({
  type,
  className,
  label,
  onClick,
  disabled,
  children,
}) => (
  <button
    type={type}
    className={classnames(className, 'btn')}
    onClick={onClick}
    disabled={disabled ?? false}
  >
    {children ?? label}
  </button>
)
