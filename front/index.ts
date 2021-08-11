import { useState, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import fetch = require('../fetch')
import h = require('react-hyperscript');

declare global {
    interface Window { webpack: any; }
}

type Message = fetch.Api.GetPost200Response
const postApi = new fetch.PostApi()

const singleMessage: FunctionComponent<Message> = ({ id, createdAt, content }: Message) =>
    h("div.frame.log", {}, [
        h("div.leftmost.ordinal", { key: 0 }, id),
        h("div.left.date", { key: "1" }, createdAt),
        h("div.middle.content", { key: "2" }, content)
    ])

const listOfMessages: FunctionComponent<{ messages: Array<Message> }> =
    ({ messages }: { messages: Array<Message> }) => {
        return (h
            ("div.exact", {}, messages.map((message) =>
                h(singleMessage, (Object.assign(message, { key: message.id }))))))
    }

const inputOfMessage: FunctionComponent = ({ }) => {
    return h("div.frame.input", {},
        [h("form.exact", {
            key: "1",
            onSubmit: (event: Event) => {
                event.preventDefault()
                var input = ((event.currentTarget as HTMLFormElement).elements as any)["message"] as HTMLInputElement
                console.log(input)
                postApi.postPost(input.value).then(() => input.value = "")
            }
        },
            [h("div.leftmost", { key: 1 })
                , h("div.left", { key: "2" })
                , h("textarea.middle", { name: "message", placeholder: "Be true to yourself!", key: "3" })
                , h("div.right.exact", { key: "4" }, [
                    h("button.right.fill", {}, ["Send"])])
            ])
        ]
    )
}

const application: FunctionComponent = () => {
    const [state, setState] = useState<Array<Message>>([])
    setTimeout((() => postApi.getPost().then(setState)), 1000)
    return h
        ("div", { className: "App" },
            [h(listOfMessages, { messages: state }, [])
                , h(inputOfMessage, { key: "2" }, [])])
}

ReactDOM.render(h(application), document.getElementById('root')
);
