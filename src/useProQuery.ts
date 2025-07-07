'use client';
import { useCallback, useEffect, useState } from "react";

/**
 * A custom React hook for managing and manipulating URL query parameters in a Next.js/React.js app.
 * 
 * Provides utility methods to get, set, remove, or reset query parameters in the URL,
 * with optional support for preserving browser history.
 * 
 * Should only called inside a react function component.
 * 
 * @param {boolean} [preserveHistory=false] - If `true`, changes to the URL will push a new history entry.
 *                                            If `false`, changes will replace the current entry.
 * 
 * @returns {{
 *   removeParams: (paramName: string) => void,
 *   setParams: (paramName: string, paramValue: string) => void,
 *   getParams: (paramName: string) => string,
 *   removeAllParams: () => void,
 *   poped: number | null
 * }} An object containing helper functions to manage query parameters and a `poped` timestamp.
 */

export default function useProQuery(preserveHistory?: boolean) {

    const [poped, setPoped] = useState<number | null>(null);

    /**
     * Updates the browser's URL using query parameters.
     * If `removeAll` is true, all query parameters are removed.
     */
    const updateURL = useCallback((updatedParams: URLSearchParams, removeAll?: boolean) => {
        if (typeof window === "undefined") return;
        const update = preserveHistory ? window.history.pushState : window.history.replaceState;
        const url = removeAll ? window.location.pathname : `${window.location.pathname}?${updatedParams.toString()}`;
        update(null, '', url);
    }, [preserveHistory]);

    /**
     * Removes a specific query parameter from the URL.
     * 
     * @param {string} paramName - The name of the query parameter to remove.
     */

    const removeParams = useCallback((paramName: string) => {
        if (typeof window === "undefined") return;
        const updatedParams = new URLSearchParams(window.location.search);
        if (!updatedParams.has(paramName)) return;
        updatedParams.delete(paramName);
        updateURL(updatedParams);
    }, [updateURL]);

    /**
     * Sets or updates a query parameter in the URL.
     * 
     * @param {string} paramName - The name of the parameter to set.
     * @param {string} paramValue - The value to assign to the parameter.
     */
    const setParams = useCallback((paramName: string, paramValue: string) => {
        if (typeof window === "undefined") return;
        const updatedParams = new URLSearchParams(window.location.search);
        if (paramValue && updatedParams.has(paramName) && updatedParams.get(paramName) === paramValue) return;
        updatedParams.set(paramName, paramValue);
        updateURL(updatedParams);
    }, [updateURL]);

    /**
     * Retrieves the value of a specific query parameter.
     * 
     * @param {string} paramName - The name of the parameter to retrieve.
     * @returns {string} The value of the parameter or an empty string if not found.
     */
    const getParams = useCallback((paramName: string) => {
        if (typeof window === "undefined") return '';
        const location = window.location.href;
        const url = new URL(location);
        return url.searchParams.get(paramName) || '';
    }, []);

    /**
    * Removes all query parameters from the URL.
    */
    const removeAllParams = useCallback(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.size) return;
        updateURL(searchParams, true);
    }, [updateURL]);

    useEffect(() => {
        const handlePopState = (e: Event) => {
            const time = (e as PopStateEvent).timeStamp || Date.now();
            setPoped(time);
        }
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    return { removeParams, setParams, getParams, removeAllParams, poped };
};
