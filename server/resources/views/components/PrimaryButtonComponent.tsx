import classnames from 'classnames'
import React from 'react'
import { DefaultButton, DefaultButtonProps } from './DefaultButton'

const PrimaryButtonComponent: React.FunctionComponent<DefaultButtonProps> = ({
  type,
  className,
  label,
  onClick,
  disabled,
  children,
}) => (
  <DefaultButton
    type={type}
    className={classnames(className, 'btn-primary py-2')}
    label={label}
    onClick={onClick}
    disabled={disabled ?? false}
  >
    {children}
  </DefaultButton>
)

export default PrimaryButtonComponent
