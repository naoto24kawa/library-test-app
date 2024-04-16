import useModal from '../../js/hooks/useModal'
import React from 'react'
import Modal from 'react-modal'
import { ModalType } from '../../js/states/modal'
import classnames from 'classnames'

export type ModalProps = {
  type: ModalType
  className?: string | string[] | object
  style?: Modal.Styles
  children?: React.ReactNode
}

export const DefaultModal: React.FunctionComponent<ModalProps> = ({
  type,
  className,
  style,
  children,
}) => {
  const [isOpen, setIsOpen] = useModal(type)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={classnames(className)}
      style={{
        ...style,
        overlay: {
          zIndex: 100, // @mui/material/TextFieldのlabelがz-index:1のため
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  )
}
