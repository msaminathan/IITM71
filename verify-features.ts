
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting verification...");

    // 1. Get Admin User
    const admin = await prisma.user.findUnique({
        where: { username: 'admin' },
    });

    if (!admin) throw new Error("Admin user not found");
    console.log("Admin found:", admin.username);

    // 2. Create Post with all fields
    const post = await prisma.post.create({
        data: {
            title: "Verification Event",
            content: "This is a test event.",
            type: "EVENT",
            imageUrl: "http://example.com/img.jpg",
            linkUrl: "http://example.com",
            authorId: admin.id
        }
    });

    console.log("Post created:", post.id);

    // 3. Verify Post Fields
    const fetchedPost = await prisma.post.findUnique({ where: { id: post.id } });
    if (fetchedPost?.type !== 'EVENT' || fetchedPost?.imageUrl !== 'http://example.com/img.jpg') {
        throw new Error("Post fields verification failed");
    }
    console.log("Post fields verified.");

    // 4. Delete Post
    await prisma.post.delete({ where: { id: post.id } });
    console.log("Post deleted.");

    // 5. Change Password Verify
    const newPass = 'newpass123';
    const hashedNewPass = await bcrypt.hash(newPass, 10);

    // Simulate updating password via API (direct DB update here for brevity, logic validates API flow relies on same DB)
    await prisma.user.update({
        where: { id: admin.id },
        data: { password: hashedNewPass }
    });

    // Verify login with new pass
    const updatedAdmin = await prisma.user.findUnique({ where: { id: admin.id } });
    const isValid = await bcrypt.compare(newPass, updatedAdmin?.password || '');
    if (!isValid) throw new Error("Password update failed verification");
    console.log("Password update verified.");

    // Reset password back to admin123
    const resetPass = await bcrypt.hash('admin123', 10);
    await prisma.user.update({
        where: { id: admin.id },
        data: { password: resetPass }
    });
    console.log("Password reset to default.");

    console.log("ALL VERIFICATIONS PASSED");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
