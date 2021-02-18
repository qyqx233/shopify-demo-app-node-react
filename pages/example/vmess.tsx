// @ts-nocheck
import { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { Form, FormLayout, Button, TextField, } from '@shopify/polaris'
import { setValue } from '../api/file'
import { postData, getJson, getText } from '../../util/http'
// import process from 'process'

function onSubmit(text: String) {
    postData('/api/file', { text: text })
        .then(res => { console.log(res) })
        .catch(e => { console.log(e) })
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.text = ''
        3
        this.myRef = React.createRef()
        this.state = {
            text: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        console.log(this.myRef.current.textContent)

    }
    render() {
        return <Form onSubmit={() => onSubmit(text)}>
            <pre
                ref={this.myRef}
                contentEditable={true}
                onKeyDown={this.handleChange}
            >{this.state.text}</pre>
            <Button submit>submit</Button>
        </Form >
    }
}
 
let text = ''

function app() {
    const ref = useRef()
    const handleTextChange = useCallback((newValue) => setText(newValue), [])
    useEffect(() => {
        getText('/api/file?m=raw')
            .then(e => {
                text = e
                ref.current.value = e
            })
            .catch(e => console.error(e))
    }, [])
    return <Form onSubmit={() => onSubmit(text)}>
        <textarea id={'textarea'} rows={30}
            style={{ width: '100%' }}
            ref={ref}
            onChange={e => {
                text = e.target.value
            }}
        ></textarea>
        <Button submit>submit</Button>
    </Form >
}

export default app