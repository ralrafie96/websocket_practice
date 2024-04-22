export const WS_URL = 'ws://localhost:8000/';

export function isUserEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.type === 'userevent';
}

export function isDocumentEvent(message: any) {
    let evt = JSON.parse(message.data);
    return evt.type === 'contentchange';
}