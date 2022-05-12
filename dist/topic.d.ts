declare type MessageAttributes = {
    [key: string]: string;
};
export default class Topic {
    #private;
    static setup(topicArn: string): Promise<void>;
    static publish(message: string, params?: MessageAttributes): Promise<void>;
}
export {};
