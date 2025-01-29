import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateToken } from './middlewares/validateToken';


export async function middleware(req: NextRequest): Promise<NextResponse> {
	const checkJWTPath: string[] = [
		"/api/v3/user/student/me",
		"/api/v3/user/student/qr",
		"/api/v3/activity/checkin"
	];
	function startsWithAny(string: string, array: string[]) {
		return array.some(prefix => string.startsWith(prefix));
	}

	if(startsWithAny(req.nextUrl.pathname, checkJWTPath)){
		const validateJWT: { status: "FAIL" | "OK"; code: number; message: string; } = validateToken(req);
		if(validateJWT.status === "FAIL"){
			return NextResponse.json({
				status: validateJWT.status,
				message: validateJWT.message
			}, {
				status: validateJWT.code
			});
		}

		return NextResponse.next();

	}
	
	return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  	matcher: [
		"/api/v3/user/student/me", 
		"/api/v3/user/student/qr", 
		"/api/v3/activity/checkin"
	],
}