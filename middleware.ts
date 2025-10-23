import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/lists/edit')) {
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return new NextResponse('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }

        const [type, credentials] = authHeader.split(' ');
        if (type !== 'Basic') {
            return new NextResponse('Invalid authentication type', { status: 401 });
        }

        const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
        const [username, password] = decoded.split(':');

        if (username !== process.env.AUTH_USER || password !== process.env.AUTH_PASS) {
            return new NextResponse('Invalid credentials', { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/lists/edit/:path*'],
};