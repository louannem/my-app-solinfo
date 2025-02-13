// import { ObjectId } from "mongodb";
import clientPromise from "../../../../../database/db";
import { read, write } from "@/lib/neo4j";


export default async (req, res) => {
    const param = req.query;
    // const id =   new ObjectId(param.id);
    const body = req.body;

    const post = await write(`
        MATCH (u:USER)
        WHERE ID(u) = ${param.id} 
        CREATE (u)<-[r:CREATED_BY]-(post:POST {
        title: '',
        content: '${body.content}'
        }) RETURN u, r, post
    `);
    
    res.json(post[0].posts);
}