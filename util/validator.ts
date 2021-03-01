const emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/

export function checkEmail(s): Boolean {
  if (emailReg.test(s))
    return true
}