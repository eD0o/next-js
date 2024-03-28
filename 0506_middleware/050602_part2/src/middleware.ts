import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const response = NextResponse.next();
  
  if(request.nextUrl.pathname.startsWith('/signin')){
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith('/account')) {
    response.cookies.set('accessAccount', 'true', {
      httpOnly: true,
    });
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next|static|public|favicon.ico).*)'],
};
