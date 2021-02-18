import {
    AppProvider, Banner, Card, DisplayText, Form, FormLayout, Frame,
    Layout, Page, Avatar, PageActions, TextField, Toast, Autocomplete, Icon,
    Checkbox, Navigation, SkeletonPage, TopBar, ActionList, TextContainer,
    TextStyle, SkeletonDisplayText, SkeletonBodyText, Modal, Loading,
    ResourceList, DataTable, Button,
} from '@shopify/polaris';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Provider, Context, useAppBridge } from '@shopify/app-bridge-react';
import Head from 'next/head';
// import styles from './hello.css';
import { postData } from '../util/http'

function useDownload() {
    (async () => {
        // const res = await fetch()
        // const obj = await res.json()
    })()
}

function downloadClick(shopName: String) {
    (async () => {
        // @ts-ignore
        postData('/api/v1/export_order', { name: shopName })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            }).catch(e => {
                console.log(`e=${e}`)
            });

        // const [req, signal] = get({url: "http://127.0.0.1:4000/test/json"})
        // const res = await req()
        // console.log(await res.json())
        return
        const a = document.createElement('a')
        try {
            a.setAttribute('download', '')
            a.setAttribute('href', 'http://127.0.0.1:4000/file')
            a.click()
        } finally {
        }
    })()
}

function useApp(app) {
    if (app) {
        app.getState().then((state) => console.log(state));
    }
}

function DataTableExample() {
    const rows = [
        ['', '10-0002', 'A2231', '红色', '10', '10',
            'USD', 'biden', 'street', '', 'city', 'ohio',
            'US', '001001', '', '+16282706713', 'a@gmail.com',
        ],
    ];

    let table;

    if (true) {
        table = <DataTable
            columnContentTypes={[
                'text', 'text', 'text', 'text', 'text', 'text',
                'text', 'text', 'text', 'text', 'text', 'text',
                'text', 'text', 'text', 'text', 'text',
            ]}
            // headings={[
            //     '', '订单号', 'sku', '属性(可填写SKU尺寸、颜色等)', '数量（大于0的整数）', '单价',
            //     '币种（默认USD）', '买家姓名', '地址1', '地址2', '城市', '省/州',
            //     '国家二字码', '邮编', '电话', '手机', 'E-mail',
            // '税号', '门牌号', '公司名', '订单备注', 
            // '图片网址', '售出链接', '中文报关名', '英文报关名',
            // ]}
            headings={[
                '', '订单号', 'sku', '属性', '数量', '单价',
                '币种', '买家姓名', '地址1', '地址2', '城市', '省/州',
                '国家二字码', '邮编', '电话', '手机', 'E-mail',
                // '税号', '门牌号', '公司名', '订单备注', 
                // '图片网址', '售出链接', '中文报关名', '英文报关名',
            ]}
            rows={rows}
        // totals={['', '', '', 255, '$155,830.00']}
        />
    } else {
        table = <Card>
            关陇集团，又称关陇世族、关陇门阀、关陇军事贵族、关陇胡汉集团、武川集团。关陇集团一词由陈寅恪所创，是指北朝的西魏、北周至隋、唐期间，籍贯为关中（今陕西省）、陇西（今甘肃省东南）的门阀士族。汉胡混血、文武合流是其特色，他们占据了当时的统治阶层。关陇集团不但以武川人为滥觞，数个朝代的肇造者亦出于武川，或武川人后代。清代考据学史家赵翼所著的《廿二史箚记‧卷十五》提到：“北周隋唐皆出自武川。”

            陈寅恪《金明馆丛稿二编》曾如此形容关陇集团：“取塞外野蛮精悍之血，注入中原文化颓废之躯，旧染既除，新机重启，扩大恢张，遂能别创空前之世局。”他并多次引用《庾子山集》，证明关陇士人与鲜卑胡姓的关系。
        </Card>
    }

    const [email, setEmail] = useState('');
    const [sendAt, setSendAt] = useState('');
    const [shopName, setShopName] = useState('');
    const app = useAppBridge();
    useEffect(() => {
        console.log(`======= app=${JSON.stringify(app)}`)
        app.getState()
            .then((state) => console.log(state))
            .catch(e => { console.log(`error=${e}`) })
            .finally(() => { console.log('finally') });
    }, [])

    return <Page title={"点小秘订单助手"}>
        <FormLayout>
            {table}
            <Button onClick={() => downloadClick('')}>导出excel</Button>
            <FormLayout.Group>
                <TextField
                    value={email}
                    onChange={e => setEmail(e)}
                    label="邮箱地址"
                    type="email"
                />
                <TextField
                    value={sendAt}
                    onChange={e => setSendAt(e)}
                    label="发送时间"
                    type="text"
                />
            </FormLayout.Group>
            <Button submit>提交</Button>
        </FormLayout>
    </Page>
}

export default DataTableExample;