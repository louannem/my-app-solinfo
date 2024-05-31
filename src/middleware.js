import { NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { useDispatch } from 'react-redux'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/profile']
const publicRoutes = ['/login', '/register', '/']
 
export default async function middleware(req) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  // Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  
 
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

 
  if(session?.id) {
    fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/users/${session.id}`)
    .then(res => res.json())
    .then(data => {
      return NextResponse.json({
        code: 200,
        data: {
          lastname: data.lastname,
          firstname: data.firstname,
          email: data.email
        }
      })
    });

  }

  if (
    isPublicRoute && 
    session?.id &&
    req.nextUrl.pathname.startsWith('/login')
  ) {
    console.log('redirect to profile')
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.id &&
    req.nextUrl.pathname.startsWith('/login')
  ) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  } 
 
  return NextResponse.next({
    headers: {
      'x-user-id': session?.id
    },
  })
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}