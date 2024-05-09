import { atomFamily } from 'recoil'

export type ModalType = 'rental' | 'return' | 'contact' | 'faq' | 'confirm'

export enum ModalTypeEnum {
  rental = 'rental',
  return = 'return',
  contact = 'contact',
  faq = 'faq',
  confirm = 'confirm',
}

export const ModalOpenState = atomFamily({
  key: 'ModalOpenState',
  default: false,
})
