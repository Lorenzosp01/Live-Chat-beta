import "./index.css"
import {useState} from "react";
import App from "./App";

function Init() {
    const [name, setName] = useState("");
    const [flag, setFlag] = useState(false);

    return (
        <div>
            { flag ? (<App nome = {name}></App>) :
                (
                    <div className={"h-screen flex flex-col items-center justify-center"}>
                        <div className={"flex flex-col items-center bg-gray-300 rounded-xl p-5 border-3"}>
                            <div className={"font-semibold mb-2"}>
                                Inserisci nickname
                            </div>
                            <input type={"text"} className={"bg-gray-200"} onChange={e => setName(e.target.value)} id = "name"/>
                            <button className={"bg-amber-400 px-4 py-2 rounded-2xl mt-4"} onClick={() => name ? setFlag(true) : setFlag(false)}>Inizia</button>
                        </div>

                    </div>
                )
            }
        </div>
    );

}

export default Init;