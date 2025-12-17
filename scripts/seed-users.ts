
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

async function main() {
    console.log('Seeding users...');

    // Clear existing users? Maybe better not to delete the test user I just made.
    // actually, let's just create new ones and ignore unique constraints if email collides?
    // Or just delete everything to be clean. Let's delete non-admin/test users.
    // For simplicity, I'll just create users with unique timestamps.

    const password = await hash('password123', 10);

    const users = [
        {
            name: 'Ravi Kumar',
            email: `ravi_${Date.now()}@example.com`,
            branch: 'Mechanical Engineering',
            location: 'Bangalore, India',
            bio: 'Retired from BHEL. Enjoying gardening and reading.',
        },
        {
            name: 'Susan George',
            email: `susan_${Date.now()}@example.com`,
            branch: 'Electrical Engineering',
            location: 'Sunnyvale, CA',
            bio: 'Tech consultant. previously at Intel.',
        },
        {
            name: 'Amitabh Bachchan',
            email: `amit_${Date.now()}@example.com`,
            branch: 'Civil Engineering',
            location: 'Mumbai, India',
            bio: 'Not the actor! Working in construction.',
        },
        {
            name: 'Priya Sharma',
            email: `priya_${Date.now()}@example.com`,
            branch: 'Computer Science',
            location: 'London, UK',
            bio: 'Professor at Imperial College.',
        }
    ];

    for (const u of users) {
        await prisma.user.create({
            data: {
                ...u,
                password,
            },
        });
        console.log(`Created user: ${u.name}`);
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
