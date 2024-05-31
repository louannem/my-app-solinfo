
import { SignJWT, jwtDecrypt } from "jose";
import clientPromise from "../../../database/db";
import bycrypt from "bcrypt";
import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export default async (req, res) => {
    try {
        const body = JSON.parse(req.body);
        const { email, password, firstname, lastname } = body;

        mongoose.connect(process.env.URL);
        
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        // Saves the new user to the database.
        const savedUser = await  newUser.save();


        return res.status(403).json({
            message: "User created successfully",
            ok: true,
            savedUser
        })
            
       
    } catch (e) {
        console.error(e);
    }
}