import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            if (typeof req.query.surveyId === 'string') 
            {
                const response = await prisma.surveys.delete({
                    where: {
                        id: req.query.surveyId
                    }
                })
                res.send({data: response})
            }
        } catch (err) {
            res.send({error: err})
        } finally {
            await prisma.$disconnect()
        }
    }
}