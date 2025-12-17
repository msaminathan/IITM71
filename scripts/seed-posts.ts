
import { prisma } from '@/lib/prisma';

async function main() {
    console.log('Seeding posts...');

    const user = await prisma.user.findFirst();

    if (!user) {
        console.error('No users found. Run seed-users.ts first.');
        process.exit(1);
    }

    const posts = [
        {
            title: 'Our 50th Reunion Plans',
            content: 'Hello everyone! I am so excited for our upcoming Golden Jubilee. Let\'s coordinate flights and hotels here. I was thinking we could all stay at the same place near Adyar.',
            authorId: user.id,
        },
        {
            title: 'Remembering Prof. Srinivasan',
            content: 'I recently came across an old photo of Prof. Srinivasan from the fluid mechanics lab. Does anyone else remember his tough grading? But what a legend!',
            authorId: user.id,
        },
        {
            title: 'Startup investment opportunities?',
            content: 'I have been mentoring a few curious minds from the current batch. They are doing amazing work in AI. Anyone interested in an angel investment round?',
            authorId: user.id,
        }
    ];

    for (const p of posts) {
        await prisma.post.create({
            data: p,
        });
        console.log(`Created post: ${p.title}`);
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
