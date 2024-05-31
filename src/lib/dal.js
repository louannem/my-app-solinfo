import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session').value
  const session = await decrypt(cookie)
 
  if (!session.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})