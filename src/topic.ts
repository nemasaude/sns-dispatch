if(process.env.NODE_ENV == 'development'){
  require('dotenv').config();
}
var AWS = require('aws-sdk');
// if(!process.env.AWS_REGION){
//   console.log(`missing environment variable AWS_REGION`);
// }
// AWS.config.update({region: process.env.AWS_REGION});

type MessageAttributes = {
  [key: string]: string,
  data: any
}

export default class Topic{
  static #topic: string
  static async setup(topicArn: string){
    this.#topic = topicArn;
  }

  static #parseParams(message: string): Object{
    const _data: MessageAttributes = JSON.parse(message);
    return {
      Message: JSON.stringify(_data),
      TopicArn: this.#topic,
      MessageAttributes: {
        "type":{
          DataType: "String",
          StringValue: _data.type
        }
      }
    }
  }

  static async publish(message: string): Promise<void>{
    try{
      if(!this.#topic){
        throw "topicArn is missing";
      }
      const teste = this.#parseParams(message);
      const info: any = await new AWS.SNS({apiVersion: '2010-03-31'}).publish(teste).promise();
      console.log("MessageID is " + info.MessageId);
      // console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    }catch(err: any){
      console.error(err)
    }
  }
}