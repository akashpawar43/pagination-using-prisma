import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();

app.use(cors());

const prisma = new PrismaClient();

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.get("/data", async (req, res) => {
    const { page, limit } = req.query;
    try {
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const offset = (pageNumber - 1) * limitNumber;
        const data = await prisma.data_records.findMany({
            skip: offset,
            take: limitNumber
        });
        const totalCount = await prisma.data_records.count();
        const totalPage = Math.ceil(totalCount / limitNumber);
        res.status(200).json({
            data,
            limit: limitNumber,
            totalPage,
            totalCount
        })
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
});


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${3000}`);
});