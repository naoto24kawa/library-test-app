import { useRecoilState, SetterOrUpdater } from 'recoil'
import { ModalOpenState, ModalType } from '../states/modal'

type Response = [boolean, SetterOrUpdater<boolean>]

const useModal = (modalType: ModalType): Response => {
  const [isOpen, setIsOpen] = useRecoilState(ModalOpenState(modalType))
  return [isOpen, setIsOpen]
}

export default useModal
