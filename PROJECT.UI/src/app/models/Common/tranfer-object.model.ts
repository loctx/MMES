export interface TranferObject {
   Status: boolean,
   Data: any,
   MessageObject: MessageObject
}

export interface MessageObject {
    Code: string,
    Message: string,
    MessageDetail: string,
    MessageType: string
}