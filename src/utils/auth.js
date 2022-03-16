import axios from 'axios'
import { encrypt } from './crypto'

export async function userLogin() {
  const token = await getFirstToken()

  const params = {
    account: 'BerMerchant01',
    password: encrypt('Ber123456', token),
    code: '',
    token,
    terminal: '1',
  }

  const { data: { data: { tokenDto: { accessToken } } } } = await axios({
    method: 'post',
    url: '/merchant/user/loginDecrypt',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params
  })
  
  if (accessToken) {
    document.cookie = `token=${accessToken}`
  }
}

async function getFirstToken() {
  const { data: { data: { token } } } = await axios.get('/merchant/user/captcha/token')
  if (!token) return ''

  return token

  
}