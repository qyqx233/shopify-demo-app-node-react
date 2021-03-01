import { useCallback, useEffect, useState } from 'react'

let count = 0

function Child({ val, getData }) {
  useEffect(() => {
    getData()
  }, [getData])
  return <div>{val}</div>
}

export default function App() {
  const [val, setVal] = useState('')
  console.log('render')
  // function getData() {
  //   setTimeout(() => {
  //     setVal('new data' + count)
  //     count++
  //   }, 500)
  // }
  const getData = useCallback(() => {
    setTimeout(() => {
      setVal('net data' + count)
      count++
    }, 500)
  }, [])

  return <Child val={val} getData={getData}></Child>
}