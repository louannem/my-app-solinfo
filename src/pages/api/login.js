
import { SignJWT } from "jose";
import clientPromise from "../../../database/db";
import bycrypt from "bcrypt";
import { read } from "@/lib/neo4j";


const sessionToken = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(sessionToken);

async function encrypt(payload){
    return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}



export default async (req, res) => {
    
    const body = JSON.parse(req.body);
    const { email, password } = body;

    const user = await read(`
        MATCH (u:USER)
        WHERE u.email = '${email}'
        return u.password as password, ID(u) as id
    `);

    if(user.length > 0) {
        const validPassword = await bycrypt.compare(password, user[0].password) || user[0].password === password;

        if(validPassword) {
            const id = (user[0].id).toString();
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const session = await encrypt({ id, expiresAt });

            const cookies = `userId= ${id}; expires=${expiresAt.toUTCString()};path=/`;

            res.setHeader("Set-Cookie", cookies);

            return res
            .status(200)
            .json(
                { 
                    ok: true, 
                    id: user.id,
                    user: user 
                }
            );

        }


    }

    // try {
    //     const body = JSON.parse(req.body);
    //     const { email, password } = body;

    //     const client = await clientPromise;
    //     const db = client.db();
        
    //     const user = await db
    //         .collection("users")
    //         .findOne({email: email});

    //     if(user) {
    //         const validPassword = await bycrypt.compare(password, user.password) || user.password === password;

    //         if(!validPassword){
    //             console.error('Wrong password')
    //         } else {
    //             const id = (user._id).toString();
    //             const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //             const session = await encrypt({ id, expiresAt });

    //             // const cookies = `session=${session}; httpOnly=false;expires=${expiresAt.toUTCString()};path=/` 
    //             const cookies = `userId= ${id}; expires=${expiresAt.toUTCString()};path=/`;

    //             res.setHeader("Set-Cookie", cookies);

    //             return res
    //             .status(200)
    //             .json(
    //                 { 
    //                     ok: true, 
    //                     id: user._id,
    //                     user: user 
    //                 }
    //             );
    //         }
    //     }
       
    // } catch (e) {
    //     console.error(e);
    // }
}