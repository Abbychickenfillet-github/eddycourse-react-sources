import React, {useState, useReducer} from 'react'

export default function Counter(){
    const [count, setCount] = useState(0)
    function increment(){
        setCount(count => count + 1)
        // 使用箭頭函數來獲取前一個狀態值，確保更新是基於最新的狀態。
    }
    function decrement(){
        setCount(prevCount => prevCount -1)
    }
    return(
        <>
        <button onClick={decrement}></button>
        <span>{count}</span>
        <button onClick={increment}></button>
        </>
    )
}