import socket from "../../Configuration";

const emit = (
    name,
    content,
    ) => {
    socket.emit(name,content);
}

const on = (name,callback = (res)=>{}) => {
    // console.log(`name nè: ${name}`)
    socket.on(name, (res) => {
        // console.log(`on nè: ${JSON.stringify(res)}`);
        callback(res);
    });
}


export {
    on,
    emit,
}