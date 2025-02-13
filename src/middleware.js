import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
// import clientPromise from '../database/db'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/profile']
const publicRoutes = ['/login', '/register', '/']
 
export default async function middleware(req) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  
  // Decrypt the session from the cookie
  let cookie;
  let isActiveSession;

  cookie = await cookies().get('userId')?.value;
  
  if(cookie) {
    fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/users/${cookie}`)
    .then(res => res.json())
    .then(data => {
      isActiveSession = data[0]?.id !== null;
      
      // 5. Redirect to /login if the user is not authenticated
      if (isProtectedRoute && isActiveSession === false) {
        console.log('user moving', isProtectedRoute, isActiveSession)
        return NextResponse.redirect(new URL('/login', req.nextUrl))
      }

      return NextResponse.redirect(new URL('/login', req.nextUrl))
    });

  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

 
  // // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   isActiveSession === true &&
  //   req.nextUrl.pathname.startsWith('/login')
  // ) {
  //   return NextResponse.redirect(new URL('/profile', req.nextUrl))
  // } 
 
  return NextResponse.next({
    headers: {
      'x-user-id': cookie
    },
  })
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}