if ('serviceWorker' in navigator) {
    console.log("serviceWorker present!");
    try {
        navigator.serviceWorker
            .register('sw.js')
            .then(() => {
                console.log("serviceWorker registerred");
            })
    } catch (error) {
        console.log("serviceWorker register failed", error);
    };
} else {
    console.log("serviceWorker not present!");
};
