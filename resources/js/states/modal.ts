import { atomFamily } from 'recoil'

export type ModalType = 'rental' | 'contact' | 'faq' | 'confirm'

export enum ModalTypeEnum {
  rental = 'rental',
  contact = 'contact',
  faq = 'faq',
  confirm = 'confirm',
}

export const ModalOpenState = atomFamily({
  key: 'ModalOpenState',
  default: false,
})
