import { read } from "@/lib/neo4j";
import clientPromise from "../../../database/db";


export default async (req, res) => {
    const limit = 10;
    const page = parseInt(req.query.page ?? '1');
    const skip = (page - 1) * limit;

    const result = await read(`
        MATCH (u:USER)
        RETURN ID(u), u.name, u.email
        SKIP ${skip}
        LIMIT ${limit}
    `, {
        limit,
        skip
    });

    const users = result.map(user => {
        return {
            id: user['ID(u)'], 
            firstname: user['u.name'], 
            email: user['u.email'] ,
        } 
    });
    res.json(users);
}