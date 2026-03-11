import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const rolePathMap: Record<string, string> = {
  ADMIN: '/admin',
  PRINCIPAL: '/principal',
  TEACHER: '/teacher',
  ACCOUNTANT: '/accountant',
  LIBRARIAN: '/librarian',
  STUDENT: '/student',
  HR: '/hr',
  PARENT: '/parent',
  STAFF: '/staff',
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Exclude public paths, api routes handling auth, etc.
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/auth') ||
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Handle missing token
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    // Only redirect to login for app routes if no token exists
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const verified = await jwtVerify(
      token as string,
      new TextEncoder().encode(JWT_SECRET)
    );

    // Default to a string type, user role from payload
    const role = (verified.payload.role as string)?.toUpperCase();

    // Check if user is trying to access a protected dashboard route
    const expectedPath = rolePathMap[role];

    if (!expectedPath) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Redirect correctly from root depending on role
    if (pathname === '/') {
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }

    // Verify role matches requested dashboard path
    for (const [key, pathPrefix] of Object.entries(rolePathMap)) {
      // Allow access to own role path, restrict others
      if (pathname.startsWith(pathPrefix) && role !== key) {
        return NextResponse.redirect(new URL(expectedPath, request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    // Token verification failed or token expired
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('accessToken');

    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
