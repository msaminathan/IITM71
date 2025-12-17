import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const {
            email,
            username,
            password,
            name,
            rollNo,
            dob,
            marriageAnniversary,
            branch,
            location,
            bio
        } = await req.json();

        if (!username || !password || !name) {
            return new NextResponse("Missing required fields (Username, Password, Name)", { status: 400 });
        }

        // Check if user exists by email, username, or rollNo
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined }, // email is optional? Requirement implies User ID (username) is key. Keep email optional or required? User provided "User logs in with user id". Let's assume username is key. Email might be useful for recovery.
                    { username },
                    { rollNo: rollNo || undefined }
                ]
            },
        });

        if (existingUser) {
            let msg = "User already exists";
            if (existingUser.username === username) msg = "Username taken";
            else if (existingUser.email === email && email) msg = "Email taken";
            else if (existingUser.rollNo === rollNo && rollNo) msg = "Roll No already registered";

            return new NextResponse(msg, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                name,
                password: hashedPassword,
                rollNo,
                dob: dob ? new Date(dob) : null,
                marriageAnniversary: marriageAnniversary ? new Date(marriageAnniversary) : null,
                branch,
                location,
                bio
            },
        });

        return NextResponse.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("[REGISTER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
