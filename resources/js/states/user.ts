import { atom } from 'recoil'

export const LoginUserState = atom<User>({
  key: 'LoginUserState',
  default: undefined,
})
