import { prisma } from '@/lib/prisma';
import DirectoryClient from './DirectoryClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function DirectoryPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const session = await getServerSession(authOptions);
    const query = searchParams.q;

    const where = query ? {
        OR: [
            { name: { contains: query } },
            { rollNo: { contains: query } },
            { branch: { contains: query } },
        ],
    } : {};

    const users = await prisma.user.findMany({
        where,
        orderBy: { name: 'asc' },
    });

    return <DirectoryClient users={users} searchParams={searchParams} currentUserId={session?.user?.id} />;
}
