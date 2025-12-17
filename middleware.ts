export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/directory",
        "/posts/:path*",
        "/profile",
        "/change-password",
        // Add other protected routes here
    ],
};
