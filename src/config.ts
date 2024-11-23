const baseUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_LOCAL_URL;

const config = {
    baseUrl,
};

export default config;
