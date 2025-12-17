import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            name,
            email,
            rollNo,
            branch,
            dob,
            marriageAnniversary,
            location,
            bio,
            photoCurrent,
            photo1966
        } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
                email,
                rollNo,
                branch,
                dob: dob ? new Date(dob) : null,
                marriageAnniversary: marriageAnniversary ? new Date(marriageAnniversary) : null,
                location,
                bio,
                photoCurrent,
                photo1966
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("[PROFILE_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
