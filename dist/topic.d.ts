export default class Topic {
    #private;
    static setup(topicArn: string): Promise<void>;
    static publish(message: string): Promise<void>;
}
