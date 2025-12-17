
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';

async function main() {
    console.log('Starting Auth Test...');

    const email = 'testuser-' + Date.now() + '@example.com';
    const password = 'testpassword123';
    const name = 'Test User';

    console.log(`Creating user: ${email}`);

    // 1. Test Registration (Hashing)
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    console.log('User created successfully:', user.id);

    // 2. Test Login (Comparison)
    const fetchedUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!fetchedUser || !fetchedUser.password) {
        throw new Error('User not found or password missing');
    }

    const isValid = await compare(password, fetchedUser.password);

    if (isValid) {
        console.log('Login verification successful: Password matches.');
    } else {
        throw new Error('Login verification failed: Password does not match.');
    }

    // Cleanup
    await prisma.user.delete({
        where: { email },
    });
    console.log('Test user cleaned up.');
}

main()
    .catch((e) => {
        console.error('Test failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
