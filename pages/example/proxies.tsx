import { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { Form, FormLayout, Button, TextField, DataTable, Frame } from '@shopify/polaris'
import { setValue } from '../api/file'
import { postData, getJson, getText, postEncoded } from '../../util/http'

function app() {
  const ref = useRef()
  const [rows, setRows] = useState([])
  useEffect(() => {
    getJson('/api/proxies?page=1&page_row=20', {}, process.env.HOST_GO_API)
      .then(json => {
        // @ts-ignore
        json.code === 0 && setRows(json.data.map(e => ['', e.name, e.subName, e.succed,
          e.failed, e.delay, e.createAt]))
      })
      .catch(e => console.error(e))

    postEncoded('/api/bbs/hello', { a: "100", b: ["a", "b", "c"] }, process.env.HOST_GO_API)
      .then(json => {
        console.log(json)
      })
      .catch(e => console.error(e))
  }, [])
  const table = <DataTable
    columnContentTypes={[
      'text', 'text', 'text', 'numeric', 'numeric', 'numeric', 'text',
    ]}
    headings={[
      '', 'ID', '订阅名', '成功次数', '失败次数', '延迟秒数', '更新时间',
    ]}
    rows={rows}
  />

  return <Frame>{table}</Frame>
}

export default app
