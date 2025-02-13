// import { ObjectId } from "mongodb";
import { read, write } from "@/lib/neo4j";


export default async (req, res) => {
    const param = req.query;
    // const id =   new ObjectId(param.id);
    const body = req.body;
    console.log(param, body)

    const post = await write(`
        MATCH (p:POST), (u:USER)
        WHERE ID(p) = ${param.id}
        AND ID(u) = ${body.userId}
        AND (u)<-[:CREATED_BY]-(p)
        DETACH DELETE p
    `);
    res.status(200).json({ status: true });

}