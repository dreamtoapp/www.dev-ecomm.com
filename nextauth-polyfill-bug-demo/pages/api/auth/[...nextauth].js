import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    // Use a dummy provider for demo; replace with your own if needed
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      authorize: async (credentials) => {
        return { id: 1, name: "Demo User", email: "demo@example.com" };
      },
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    },
  ],
  secret: "demo-secret",
});
