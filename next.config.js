module.exports = {
    reactStrictMode: true,
    rewrites() {
        return {
            beforeFiles: [
                // app.hmu.world subdomain rewrites
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: 'app.hmu.world',
                        },
                    ],
                    destination: '/app/:path*',
                },
            ]
        }
    }
}
