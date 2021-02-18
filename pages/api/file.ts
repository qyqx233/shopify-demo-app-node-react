import * as fs from 'fs'
import * as path from 'path'

let obj = {}
const p = path.resolve(__dirname, 'obj.json')

export function setValue(key, value) {
    obj[key] = value
    console.log(`path == ${p}`)
    fs.writeFileSync(p, JSON.stringify(obj))
}

export function getValue(key) {
    if (fs.existsSync(p)) {
        obj = JSON.parse(fs.readFileSync(p).toString())
    }
    return obj[key]
}

export default function fx(req, res) {
    if (req.method === 'POST') {
        let text = req.body['text'] as String
        console.log(text)
        // @ts-ignore
        setValue('text', text)
        res.status(200).json({ code: 0 })
    } else {
        const query = req.query
        let text = getValue('text')
        if (query.m === 'raw')
            res.status(200).end(text)
        else {
            text = text.trim()
            let col: String[]
            col = text.split('\n')
                .map(s => s.trim())
                .filter(s => s !== "")
            // console.log(col)
            const value = Buffer.from(col.map(s => {
                if (s.startsWith("vmess")) {
                    return s
                }
            }).join('\n')).toString('base64')
            res.status(200).end(value)
        }
    }
}