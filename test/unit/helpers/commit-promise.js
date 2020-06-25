export default (store, ...args) => {
    const changePromise = new Promise((resolve) => {
        const unwatch = store.watch(state => state, (state) => {
            unwatch();
            resolve(state);
        }, { deep: true });
    });

    store.commit(...args);

    return changePromise;
};
