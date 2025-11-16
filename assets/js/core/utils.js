// --- Дебаунс ---
export function debounce(fn, delay = 150) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// --- Троттлинг ---
export function throttle(fn, limit = 150) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    };
}

// --- Lazy loader для модулей ---
export async function lazy(importFn) {
    return await importFn();
}
