import { ObjectId } from "mongodb";
import clientPromise from "../../../../database/db";
import { read } from "@/lib/neo4j";


export default async (req, res) => {
    const param = req.query;
    // const id =   new ObjectId(param.id);

    // try {
    //     const client = await clientPromise;
    //     const db = client.db();
    //     const users = await db
    //         .collection("users")
    //         .findOne({_id: id});
    //     res.json(users);
    // } catch (e) {
    //     console.error(e);
    // }

    if(param.id) {
        const user = await read(`
            MATCH (u:USER)
            WHERE ID(u) = ${param.id} 
            OPTIONAL MATCH (u:USER), (p:POST)
            WHERE ID(u) = ${param.id} 
            AND (u)<-[:CREATED_BY]-(p)
            RETURN  ID(u) as id,
            u.name as name,
            u.email as email,
            collect({content: p.content, title: p.title, id: ID(p)}) as posts
        `);
        
        if(user[0].posts.length > 0) {
            user[0].posts = user[0].posts.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                }
            })
        } 


        res.json(user[0]);
    }
}