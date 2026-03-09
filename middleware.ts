import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Якщо немає accessToken
  if (!accessToken) {
    if (refreshToken) {
      // пробуємо оновити сесію
      const res = await checkSessionServer();
      const resCookie = res?.headers?.["set-cookie"];

      if (resCookie) {
        // створюємо один об’єкт відповіді
        const response = NextResponse.next();
        const cookieArray = Array.isArray(resCookie) ? resCookie : [resCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          };
          if (parsed.accessToken) {
            response.cookies.set("accessToken", parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            response.cookies.set("refreshToken", parsed.refreshToken, options);
          }
        }

        // тепер обробляємо маршрути
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        if (isPrivateRoute) {
          return response;
        }
      }
    }

    // якщо токенів немає взагалі
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // якщо користувач вже авторизований
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
