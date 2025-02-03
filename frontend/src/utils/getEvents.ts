import prisma from "@/lib/prisma";

export default async function getEvents() {
  const events = await prisma.events.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return events
}