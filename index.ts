import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.post.create ({data: {content: "meow"}})
    await prisma.post.create ({data: {content: "sop sop"}})
    console.log (await prisma.post.findMany ( ))
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
