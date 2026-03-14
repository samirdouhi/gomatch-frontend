const nextConfig = {
  async rewrites() {
    const target = process.env.AUTH_API_TARGET;
    if (!target) {
      throw new Error("AUTH_API_TARGET is missing (set it in .env.local)");
    }

    return [
      {
        source: "/api/auth/:path*",
        destination: `${target}/auth/:path*`, // ✅ correction ici
      },
    ];
  },
};

export default nextConfig;
