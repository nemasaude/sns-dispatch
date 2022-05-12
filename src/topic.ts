require('dotenv').config();
var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
type MessageAttributesValues = {
  DataType: string,
  StringValue: string
}

type MessageAttributes = {
  [key: string]: MessageAttributesValues
}
type SnsParams = {
  Message: string,
  TopicArn?: string
  MessageAttributes?: MessageAttributes
}

export default class Topic{
  static #topic: string
  static async setup(topicUrl: string){
    this.#topic = topicUrl;
  }

  static async publish(params: SnsParams): Promise<void>{
    try{
      if(!params.TopicArn){
        params = {...params, TopicArn: this.#topic};
      }
      const info: any = await new AWS.SNS({apiVersion: '2010-03-31'}).publish({...params, TopicArn: this.#topic}).promise()
      console.log("MessageID is " + info.MessageId);      
      // console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    }catch(err: any){
      console.error(err, err.stack)
    }
  }
}