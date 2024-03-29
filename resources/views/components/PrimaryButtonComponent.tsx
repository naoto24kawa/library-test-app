import classnames from 'classnames'
import React from 'react'

type Props = {
  type?: 'submit' | 'button' | 'reset'
  className?: string | string[] | object
  disabled?: boolean
  children?: React.ReactNode
}

const PrimaryButtonComponent: React.FunctionComponent<Props> = (props) => (
  <button
    type={props.type}
    className={classnames(props.className, 'btn btn-primary w-100 py-2')}
    disabled={props.disabled ?? false}
  >
    {props.children}
  </button>
)

export default PrimaryButtonComponent
