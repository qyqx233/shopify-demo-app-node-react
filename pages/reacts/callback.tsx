import { useCallback, useEffect, useState } from 'react'
import { Button } from '@shopify/polaris'

export default function Index() {
  const [clickCount, increaseCount] = useState(0);
  // 没有使用`useCallback`，每次渲染都会重新创建内部函数
  // const handleClick = () => {
  //   console.log('handleClick');
  //   increaseCount(clickCount + 1);
  // }

  // 使用`useCallback`，但也每次渲染都会重新创建内部函数作为`useCallback`的实参
  const handleClick = useCallback(() => {
      console.log('handleClick');
      increaseCount(clickCount + 1);
  }, [])

  return (
    <div>
      <p>{clickCount}</p>
      <Button onClick={handleClick}>Click</Button>
    </div>
  )
}