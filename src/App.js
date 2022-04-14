import "./index.css"
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const socket = io(`localhost:20000`);

function App(props) {

    const [testo, setTesto] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const listenerMessages = msg => {
            setMessages(oldState => [...oldState, msg]);
        };

        if (socket) {
            socket.on('chat message', listenerMessages);
            socket.on('join', listenerMessages)
            socket.on('left', listenerMessages)

            socket.emit('join', props.nome)
            console.log(props.nome)
        } else {
            console.log("Non puoi aprire il listener")
        }

        return () => { // on unmount, clean your listeners
            if (socket)
                socket.close()
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault()
        if (testo) {
            socket.emit('chat message', props.nome + ":" + testo)
            e.target.messageInput.value = ""
            setTesto("")
        }
    }

    const listaMessaggi = messages.map((msg, i) => {
            let nome = msg.split(":")[0]
            let messaggio = msg.split(":")[1]

            if (!(messaggio === "join" || messaggio == "left")) {
                return (
                    <div key={i} className={"flex flex-row"}>
                        <div
                            className={"font-bold p-3 text-center flex items-center justify-center "}>{nome}</div>
                        <div className={"bg-gray-100 p-3 rounded-2xl flex-1 break-all"}>{messaggio}</div>
                    </div>
                )
            } else {
                if(messaggio === "join"){
                    return (
                        <div key={i} className={"flex flex-row"}>
                            <div className={"font-bold p-3 text-center flex items-center justify-center "}>{nome + " e' entrato"}</div>
                        </div>
                    )
                } else {
                    return (
                        <div key={i} className={"flex flex-row"}>
                            <div className={"font-bold p-3 text-center flex items-center justify-center "}>{nome + " e' uscito"}</div>
                        </div>
                    )
                }

            }
        }
    );

    return (
        <div className="flex flex-col h-screen ml-2 mr-2">
            <div className="text-center mt-2 align-middle font-bold">
                Chat - {props.nome}
            </div>
            <div className={"flex-grow"}>
                <div className="flex flex-col gap-x-2 gap-y-1 mt-3 mb-3">
                    {listaMessaggi}
                </div>
            </div>
            <form onSubmit={handleClick} className="mb-2 flex">
                <input type="text" onChange={(e) => setTesto(e.target.value)} name="a" id="messageInput"
                       className="flex-1 bg-gray-200 rounded-md px-2" placeholder={"Type a message"}/>
                <button type={"submit"} className="bg-text-center ml-2 border-2 rounded-2xl px-4 py-2 bg-amber-400">
                    Send
                </button>
            </form>
        </div>
    );
}

export default App;
