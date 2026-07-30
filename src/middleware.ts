import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirect /admin to /admin/ to avoid trailing-slash issues with Payload
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin'],
}
