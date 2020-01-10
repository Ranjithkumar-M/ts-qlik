let checkFile;
const loadJSCSSFile = async (baseUrl, config) => {
  try {
    if (checkFile || document.getElementById('loadJSCSSFile')) {
      await checkFile;
      return;
    }
    const jsFileLoad = document.createElement('script');
    jsFileLoad.src = `${baseUrl}/assets/external/requirejs/require.js`;
    jsFileLoad.id = 'loadJSCSSFile';
    document.head.prepend(jsFileLoad);
    jsFileLoad.loaded = new Promise((resolve) => {
      jsFileLoad.onload = () => {
        resolve();
      };
    });
    const cssFileLoad = document.createElement('link');
    cssFileLoad.href = `${baseUrl}/assets/client/client.css`;
    cssFileLoad.type = 'text/css';
    cssFileLoad.rel = 'stylesheet';
    document.head.prepend(cssFileLoad);
    cssFileLoad.loaded = new Promise((resolve) => {
      cssFileLoad.onload = () => {
        resolve();
      };
    });
    checkFile = Promise.all([jsFileLoad.loaded, cssFileLoad.loaded]);
    await checkFile;
  } catch (error) {

    console.log(error)
    throw new Error(error);
  }
};
export default loadJSCSSFile;
