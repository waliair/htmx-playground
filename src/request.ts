import {completeWithChatGPT} from "./openai";

const requests: Record<string, {
    completion: string,
    pending: boolean
}
> = {};

export const getRequest = (reqId) => {
    return requests[reqId]
}

export const startRequest = async (prompt: string) => {
    const reqId = Math.random().toString(36).substring(2, 15);
    requests[reqId] = {
        completion: "",
        pending: true,
    };

    completeWithChatGPT(
        `Give information about a ${prompt}`,
        (text) => {
            requests[reqId].completion = text
        },
        () => {
            requests[reqId].pending = false;
        }
    );


    return reqId;
}