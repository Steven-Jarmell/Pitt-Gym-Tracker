import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const validGymNames: string[] = [
  "Bellefield_Hall",
  "Pitt_Sports_Dome",
  "Trees_Hall",
  "William_Pitt_Union",
]

// Check if the id is in the courses list
const checkIfValidPage = (id: string) => {
  return validGymNames.includes(id)
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return
  }

  // Check that a class page we route to is valid
  if (!checkIfValidPage(request.nextUrl.pathname.split("/")[1])) {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
