import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState({ hits: [] });
    // useEffect(() => {
    //     setData({hits: [{ objectID: "100", url: "baidu.com", title: "baidu"}]})
    useEffect(() => {
        (async () => {
            const result = await fetch(
                'https://hn.algolia.com/api/v1/search?query=redux',
            );
            setData(await result.json());
        })()
        // f()
    }, []);

    // useEffect(() => {
    //     async function anyNameFunction() {
    //       await loadContent();
    //     }
    //     anyNameFunction();
    //   }, []);

    return (
        <ul>
            {data.hits.map(item => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
}

export default App;
