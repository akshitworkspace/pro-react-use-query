'use client';
import { useCallback } from "react";

export default function useProQuery(preserveHistory?: boolean) {
    const updateURL = useCallback((updatedParams: URLSearchParams, removeAll?: boolean) => {
        if (typeof window === "undefined") return;
        const update = preserveHistory ? window.history.pushState : window.history.replaceState;
        const url = removeAll ? window.location.pathname : `${window.location.pathname}?${updatedParams.toString()}`;
        update(null, '', url);
    }, [preserveHistory]);

    const removeParams = useCallback((paramName: string) => {
        if (typeof window === "undefined") return;
        const updatedParams = new URLSearchParams(window.location.search);
        if (!updatedParams.has(paramName)) return;
        updatedParams.delete(paramName);
        updateURL(updatedParams);
    }, [updateURL]);

    const setParams = useCallback((paramName: string, paramValue: string) => {
        if (typeof window === "undefined") return;
        const updatedParams = new URLSearchParams(window.location.search);
        updatedParams.set(paramName, paramValue);
        updateURL(updatedParams);
    }, [updateURL]);

    const getParams = useCallback((paramName: string) => {
        if (typeof window === "undefined") return '';
        const location = window.location.href;
        const url = new URL(location);
        return url.searchParams.get(paramName) || '';
    }, []);

    const removeAllParams = useCallback(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.size) return;
        updateURL(searchParams, true);
    }, [updateURL])

    return { removeParams, setParams, getParams, removeAllParams };
};
