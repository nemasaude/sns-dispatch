declare type MessageAttributesValues = {
    DataType: string;
    StringValue: string;
};
declare type MessageAttributes = {
    [key: string]: MessageAttributesValues;
};
declare type SnsParams = {
    Message: string;
    TopicArn?: string;
    MessageAttributes?: MessageAttributes;
};
export default class Topic {
    #private;
    static setup(topicUrl: string): Promise<void>;
    static publish(params: SnsParams): Promise<void>;
}
export {};
