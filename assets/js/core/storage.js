export const storage = {
    get(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return defaultValue;

            // Если это JSON — парсим
            if (raw.startsWith("{") || raw.startsWith("[")) {
                return JSON.parse(raw);
            }

            // иначе возвращаем как строку
            return raw;
        } catch (e) {
            console.warn("storage.get error:", e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            if (typeof value === "object") {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.warn("storage.set error:", e);
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn("storage.remove error:", e);
        }
    }
};
