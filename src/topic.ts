require('dotenv').config();
var AWS = require('aws-sdk');
// if(!process.env.AWS_REGION){
//   console.log(`missing environment variable AWS_REGION`);
// }
// AWS.config.update({region: process.env.AWS_REGION});

type MessageAttributes = {
  [key: string]: string
}

export default class Topic{
  static #topic: string
  static async setup(topicArn: string){
    this.#topic = topicArn;
  }

  static #parseParams(message: string, params: MessageAttributes): Object{
    const _params: {[key: string]: any} = {};
    for (const key in params) {
      _params[key] = {
        DataType: "String",
        StringValue: params[key]
      }
    }

    return {
      Message: message,
      TopicArn: this.#topic,
      MessageAttributes: _params
    }
  }

  static async publish(message: string, params: MessageAttributes = {}): Promise<void>{
    try{
      if(!this.#topic){
        throw "topicArn is missing";
      }
      const teste = this.#parseParams(message, params);
      const info: any = await new AWS.SNS({apiVersion: '2010-03-31'}).publish(teste).promise();
      console.log("MessageID is " + info.MessageId);
      // console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    }catch(err: any){
      console.error(err)
    }
  }
}