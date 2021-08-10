import React, { useState, useEffect, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import fetch = require('../fetch')

declare global {
    interface Window { webpack: any; }
}

window.webpack = window.webpack || {};
window.webpack.fetch = fetch

type Message = fetch.Api.GetPost200Response
const postApi = new fetch.PostApi()

const singleMessage: FunctionComponent<Message> = ({ id, createdAt, content }: Message) =>
    React.createElement("div", {}, [
        React.createElement("h5", { key: "1" }, [id]),
        React.createElement("h6", { key: "2" }, [createdAt]),
        React.createElement("p", { key: "3" }, [content])
    ])

const listOfMessages: FunctionComponent<{ messages: Array<Message> }> =
    ({ messages }: { messages: Array<Message> }) => {
        return (React.createElement
            ("div", {}, messages.map((message) =>
                React.createElement(singleMessage, (Object.assign(message, { key: message.id }))))))
    }

const inputOfMessage: FunctionComponent = ({ }) => {
    return React.createElement("div", {},
        [React.createElement("form", {
            key: "1",
            onSubmit: (event: Event) => {
                event.preventDefault()
                var input = (event.currentTarget as HTMLElement).children[0] as HTMLInputElement
                postApi.postPost (input.value). then (( ) => input.value = "")
            }
        },
            [React.createElement("input", { key: "1" })
                , React.createElement("button", { key: "2", }, ["Send"])])
        ]
    )
}

const application: FunctionComponent = () => {
    const [state, setState] = useState<Array<Message>>([])
    setTimeout((() => postApi.getPost().then(setState)), 1000)
    return React.createElement
        ("div", { className: "App" },
            [React.createElement(listOfMessages, { messages: state, key: "1" }, [])
                , React.createElement(inputOfMessage, { key: "2" }, [])])
}

ReactDOM.render(React.createElement(application), document.getElementById('root')
);
