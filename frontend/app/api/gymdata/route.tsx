import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.gymdata.findMany({
      distinct: ["name"],
      select: {
        name: true,
      },
    })
    return Response.json(data, { status: 200 })
  } catch (err) {
    console.log(err)
    return Response.json([], { status: 204 })
  }
}
