// @ts-nocheck

const basicParam = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        // 'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

function isString(): s is string {

}

export async function getText(url = '', data = {}, host = process.env.API_HOST) {
    const reqUrl = `${host}${url}`
    const param = Object.assign({ method: 'POST' }, basicParam)
    const response = await fetch(reqUrl, param);
    return response.text(); // parses JSON response into native JavaScript objects
}

export async function getJson(url = '', data = {}, host = process.env.API_HOST) {
    const reqUrl = `${host}${url}`
    const param = Object.assign({ method: 'GET' }, basicParam)
    const response = await fetch(reqUrl, param);
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function postJson(url = '', data = {}, host = process.env.API_HOST) {
    const param = Object.assign({ method: 'POST' }, basicParam)
    param['headers']['Content-Type'] = 'application/json'
    const response = await fetch(`${host}${url}`, param);
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function postEncoded(url = '', data = {}, host = process.env.API_HOST) {
    const param = Object.assign({ method: 'POST' }, basicParam)
    param['headers']['Content-Type'] = 'application/x-www-form-urlencoded'
    const formData = new URLSearchParams()
    // const formData = new FormData()
    for (const k in data) {
        const v = data[k]
        if (Array.isArray(v)) {
            for (const vv in v)
                formData.append(k, vv)
        } else {
            formData.append(k, v)
        }
    }
    param.body = formData
    const response = await fetch(`${host}${url}`, param);
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function postData(url = '', data = {}, host = process.env.API_HOST) {
    // Default options are marked with *
    const response = await fetch(`${host}${url}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export function get(params: Request): [() => Promise<Response>, AbortSignal] {
    const controller = new AbortController()
    const signal = controller.signal
    // @ts-ignore
    const q = {
        ...basicGetParam, ...params
    }
    console.log(q)
    return [() => fetch(q, { signal }), signal]
}