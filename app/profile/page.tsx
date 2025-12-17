import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    // Serializable user object for client component
    const sanitizedUser = {
        ...user,
        dob: user.dob ? user.dob.toISOString().split('T')[0] : '',
        marriageAnniversary: user.marriageAnniversary ? user.marriageAnniversary.toISOString().split('T')[0] : '',
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 px-4 sm:px-0">Edit Profile</h1>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <ProfileForm user={sanitizedUser} />
            </div>
        </div>
    );
}
