import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { gymName: string } }
) {
  try {
    const data = await prisma.gymData.findMany({
      where: {
        name: params.gymName,
      },
      select: {
        count: true,
        lastUpdated: true,
      },
      orderBy: {
        lastUpdated: "desc",
      },
    })
    return Response.json(data, { status: 200 })
  } catch (err) {
    console.log(err)
    return Response.json([], { status: 204 })
  }
}
