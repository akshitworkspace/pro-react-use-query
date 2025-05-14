# 🧩 pro-react-use-query-hook

A lightweight custom React hook to easily manage URL search parameters — optimized for **Next.js** and **React** apps.

---

## ✨ Features

- 🔍 `getParams`: Safely retrieve query param values
- 🧼 `setParams`: Add or update query params
- ❌ `removeParams`: Remove a specific param
- 🔄 `removeAllParams`: Clear all params at once
- 🧠 SSR-safe (won't crash on server)

---

## 📖 API Reference

| Method                 | Description                   | Example                      |
| ---------------------- | ----------------------------- | ---------------------------- |
| `getParams(name)`      | Gets the value of a param     | `getParams('foo')` → `'bar'` |
| `setParams(name, val)` | Sets or updates a query param | `setParams('foo', 'bar')`    |
| `removeParams(name)`   | Removes a specific param      | `removeParams('foo')`        |
| `removeAllParams()`    | Clears all search params      | `removeAllParams()`          |

## ⚠️ Beware

getParams must be called inside a useEffect() or client-only logic, since it relies on window.location.

```bash
useEffect(() => {
  const value = getParams('token'); // ✅ safe
}, []);
```

## 📝 Usage/Example

```typescript
'use client';  // Required for Next.js App Router
import React, { useState, useEffect } from 'react';
import useProQuery from 'pro-react-use-query-hook';

export default function QueryParamsExample() {
    // Extract query param manipulation methods from the hook
    const { setParams, getParams, removeParams, removeAllParams } = useProQuery();

    // Local state for the param name, value, and the current query value shown
    const [paramName, setParamName] = useState('');
    const [paramValue, setParamValue] = useState('');
    const [queryValue, setQueryValue] = useState('');

    // On component mount, check if 'foo' is in the URL and prefill it
    useEffect(() => {
        const initial = getParams('foo');
        if (initial) {
            setParamName('foo');
            setParamValue(initial);
            setQueryValue(initial);
        }
    }, []);

    // Set a query parameter using the name and value from input
    const handleSet = () => setParams(paramName, paramValue);

    // Get the current value of the specified query parameter
    const handleGet = () => setQueryValue(getParams(paramName) || '');

    // Remove a specific query parameter and clear input fields
    const handleRemove = () => {
        removeParams(paramName);
        setParamName('');
        setParamValue('');
        setQueryValue('');
    };

    // Clear all query parameters from the URL
    const handleClear = () => {
        removeAllParams();
        setParamName('');
        setParamValue('');
        setQueryValue('');
    };

    return (
        <div style={{
            fontSize: "15px", maxWidth: '480px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px',
            fontFamily: 'sans-serif', backgroundColor: "#000000", color: '#f5f5f5'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: "14px", fontWeight: "bold" }}>🔍 useProQuery Demo</h2>

            {/* Input fields for param name and value */}
            <div style={{ marginBottom: '12px', display: "flex", gap: "4px", }}>

                <input
                    type="text"
                    placeholder="Param name"
                    value={paramName}
                    onChange={(e) => setParamName(e.target.value)}
                    style={{ padding: '6px', marginRight: '8px', width: '100%', flex: "1", border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    placeholder="Param value"
                    value={paramValue}
                    onChange={(e) => setParamValue(e.target.value)}
                    style={{ padding: '6px', marginRight: '8px', width: '100%', flex: "1", border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>

            <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {/* Set selected param */}
                <button onClick={handleSet} style={btnStyle}>Set</button>

                {/* Get selected param value */}
                <button onClick={handleGet} style={btnStyle}>Get</button>

                {/* Remove selected param */}
                <button onClick={handleRemove} style={{ ...btnStyle, backgroundColor: '#e74c3c', marginLeft: "auto" }}>Remove</button>

                {/* Clear all query parameters */}
                <button onClick={handleClear} style={{ ...btnStyle, backgroundColor: '#555' }}>Clear All</button>
            </div>

            {/* Output the current value of the selected query param */}
            <div>
                <strong>Query Value:</strong>
                <pre style={{ backgroundColor: '#f4f4f430', padding: '6px', borderRadius: '4px', marginTop: '4px' }}>
                    {queryValue || '?'}
                </pre>
            </div>
        </div>
    );
}

const btnStyle = {
    padding: '6px 10px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};
```

## 🐼 Author

Made with ❤️ by Akshit Lakhanpal

## License

MIT – free for personal and commercial use.