import loadJSCSSFile from './loadRequireFiles';

const qlikConnection = async (config) => {
    try {
        const prefix = (config.prefix !== '/') ? config.prefix : '/',
        URL = `${(config.secure ? 'https://' : 'http://') + config.host + (config.port ? `:${config.port}` : '') + prefix}resources`;
        await loadJSCSSFile(URL, config);
        
        window.require.config({
            baseUrl: URL,
            paths: {
                qlik: `${URL}/js/qlik`,
            },
            config: {
                text: {
                    useXhr() {
                        return true;
                    },
                },
            },
        });
        return new Promise((resolve) => {
            window.require(['js/qlik'], (q) => {
                resolve(q);
            });
        })
    } catch (error) {
        console.log(error);
    }
}

export default qlikConnection;