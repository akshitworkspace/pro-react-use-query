'use client';
import { useCallback } from "react";
export default function useQuery() {
    const updateURL = useCallback((updatedParams) => {
        if (typeof window === "undefined")
            return;
        window.history.replaceState(null, '', `${window.location.pathname}?${updatedParams.toString()}`);
    }, []);
    const removeParams = useCallback((paramName) => {
        if (typeof window === "undefined")
            return;
        const updatedParams = new URLSearchParams(window.location.search);
        updatedParams.delete(paramName);
        updateURL(updatedParams);
    }, [updateURL]);
    const setParams = useCallback((paramName, paramValue) => {
        if (typeof window === "undefined")
            return;
        const updatedParams = new URLSearchParams(window.location.search);
        updatedParams.set(paramName, paramValue);
        updateURL(updatedParams);
    }, [updateURL]);
    const getParams = useCallback((paramName) => {
        if (typeof window === "undefined")
            return '';
        const location = window.location.href;
        const url = new URL(location);
        return url.searchParams.get(paramName) || '';
    }, []);
    const removeAllParams = useCallback(() => {
        if (typeof window === "undefined")
            return;
        window.history.replaceState(null, '', window.location.pathname);
    }, []);
    return { removeParams, setParams, getParams, removeAllParams };
}
;
