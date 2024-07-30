//ctrl + alt+o
import {useEffect, useState} from "react";

export function FComponent() {
    let [a, setA] = useState(0);
    let [b, setB] = useState(0);
    let [kq, setKQ] = useState(0);

    useEffect(() => {
        axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn').then(x => {
            console.log(x)
        })
    }, []);

    return (
        <>
            {/*F component {a}*/}
            {/*<button onClick={() => {*/}
            {/*    setA(a + 1)*/}
            {/*}}>Thay a*/}
            {/*</button>*/}
            <input type="text" value={a} onChange={(e) => {
                setA(+e.target.value)
            }}/>
            <input type="text" value={b} onChange={(e) => {
                setB(+e.target.value)
            }}/>
            <button onClick={() => {
                setKQ(a + b)
            }}>
                +
            </button>

            <button onClick={() => {
                setKQ(-a + b)
            }}>
                -
            </button>

            <button onClick={() => {
                setKQ(a * b)
            }}>
                *
            </button>

            <button onClick={() => {
                setKQ(a / b)
            }}>
                +
            </button>
            <h1>{kq}</h1>
        </>
    )
}