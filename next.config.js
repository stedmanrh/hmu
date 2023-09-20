module.exports = {
    reactStrictMode: true,
    beforeFiles: [
        // app subdomain rewrites
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
