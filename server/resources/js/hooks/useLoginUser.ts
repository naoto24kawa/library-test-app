import { SetterOrUpdater, useRecoilState } from 'recoil'
import { LoginUserState } from '../states/user'

const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(LoginUserState)
  return [loginUser, setLoginUser] as [User, SetterOrUpdater<User>]
}

export default useLoginUser
