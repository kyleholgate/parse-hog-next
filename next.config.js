/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/hl7_parser',
                destination: '/hl7/parser',
                permanent: true,
            },
            {
                source: '/hl7_lookup',
                destination: '/hl7/lookup',
                permanent: true,
            },
            {
                source: '/adt_events',
                destination: '/hl7/adt-events',
                permanent: true,
            }
        ]
    },
}

module.exports = nextConfig  