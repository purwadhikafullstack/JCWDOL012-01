import { NextRequest, NextResponse } from 'next/server';
import { getCookies } from 'next-client-cookies/server';

const protectedRoutes = [
  '/dashboard',
  '/dashboard/users',
  '/dashboard/products',
  '/dashboard/products/create',
  '/dashboard/categories',
  '/dashboard/stores',
];
const storeAdminOnly = [
  '/dashboard',
  '/dashboard/products',
  '/dashboard/categories',
  '/dashboard/stores',
];
const superAdminOnly = [
  '/dashboard/users',
  '/dashboard/users/create',
  '/dashboard/products/create'
];

export default async function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    const cookies = getCookies();
    const session: any = cookies.get('session');

    if (!session) return NextResponse.redirect(absoluteURL.toString());

    const { token } = await JSON.parse(session);

    if (!token) return NextResponse.redirect(absoluteURL.toString());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify-token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) return NextResponse.redirect(absoluteURL.toString());

      const { results } = await res.json();
      console.log(results);

      if (superAdminOnly.includes(req.nextUrl.pathname) && results.role === 'Super_Admin') {
        return NextResponse.next();
      }

      if (
        storeAdminOnly.includes(req.nextUrl.pathname) &&
        (results.role === 'Store_Admin' || results.role === 'Super_Admin')
      ) {
        return NextResponse.next();
      }

      return NextResponse.redirect(absoluteURL.toString());
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}