# 🧩 pro-react-use-query-hook

A lightweight custom React hook to easily manage URL search parameters — optimized for **Next.js** and **React** apps.

---

## ✨ Features

- 🔍 `getParams`: Safely retrieve query param values
- 🧼 `setParams`: Add or update query params
- ❌ `removeParams`: Remove a specific param
- 🔄 `removeAllParams`: Clear all params at once
- 🧠 SSR-safe (won't crash on server)
- ⚛️ React 17/18/19 compatible

---


## API Reference

| Method                 | Description                   | Example                      |
| ---------------------- | ----------------------------- | ---------------------------- |
| `getParams(name)`      | Gets the value of a param     | `getParams('foo')` → `'bar'` |
| `setParams(name, val)` | Sets or updates a query param | `setParams('foo', 'bar')`    |
| `removeParams(name)`   | Removes a specific param      | `removeParams('foo')`        |
| `removeAllParams()`    | Clears all search params      | `removeAllParams()`          |



## Appendix

getParams must be called inside a useEffect() or client-only logic, since it relies on window.location.

```bash
useEffect(() => {
  const value = getParams('token'); // ✅ safe
}, []);



## Authors
Made with ❤️ by Akshit Lakhanpal


## License
MIT – free for personal and commercial use.



## Usage/Examples

```javascript
'use client'; // Required for Next.js App Router

import { useEffect, useState } from 'react';
import { useProQuery } from 'pro-react-use-query-hook';

export default function QueryParamsExample() {
  const { setParams, getParams, removeParams, removeAllParams } = useProQuery();
  const [paramValue, setParamValue] = useState('');
  const [paramName, setParamName] = useState('');

  // Fetch a query param when the component mounts
  useEffect(() => {
    const fooValue = getParams('foo');
    console.log('Fetched query param "foo":', fooValue); // This will log the value of "foo" from the URL if exists.
  }, [getParams]);

  const handleSetParam = () => {
    setParams(paramName, paramValue);
    console.log(`Set param: ${paramName} = ${paramValue}`);
  };

  const handleRemoveParam = () => {
    removeParams(paramName);
    console.log(`Removed param: ${paramName}`);
  };

  const handleClearAllParams = () => {
    removeAllParams();
    console.log('All params cleared');
  };

  return (
    <div>
      <h1>Manage Query Parameters</h1>

      <div>
        <label>
          Param Name:
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
            placeholder="e.g., foo"
          />
        </label>
      </div>

      <div>
        <label>
          Param Value:
          <input
            type="text"
            value={paramValue}
            onChange={(e) => setParamValue(e.target.value)}
            placeholder="e.g., bar"
          />
        </label>
      </div>

      <button onClick={handleSetParam}>Set Param</button>
      <button onClick={handleRemoveParam}>Remove Param</button>
      <button onClick={handleClearAllParams}>Clear All Params</button>

      <div>
        <h3>Current URL Query Parameters:</h3>
        <pre>{window.location.search}</pre>
      </div>
    </div>
  );
}
```

