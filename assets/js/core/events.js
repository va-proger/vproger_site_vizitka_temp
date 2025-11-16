export const onReady = (cb) => {
    if (document.readyState !== "loading") cb();
    else document.addEventListener("DOMContentLoaded", cb);
};

export const on = (el, event, handler) => el?.addEventListener(event, handler);
