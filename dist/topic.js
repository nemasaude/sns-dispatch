"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Topic_topic, _Topic_parseParams;
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV == 'development') {
    require('dotenv').config();
}
var AWS = require('aws-sdk');
class Topic {
    static setup(topicArn) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _a, topicArn, "f", _Topic_topic);
        });
    }
    static publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!__classPrivateFieldGet(this, _a, "f", _Topic_topic)) {
                    throw "topicArn is missing";
                }
                const teste = __classPrivateFieldGet(this, _a, "m", _Topic_parseParams).call(this, message);
                const info = yield new AWS.SNS({ apiVersion: '2010-03-31' }).publish(teste).promise();
                console.log("MessageID is " + info.MessageId);
                // console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.default = Topic;
_a = Topic, _Topic_parseParams = function _Topic_parseParams(message) {
    const _data = JSON.parse(message);
    return {
        Message: JSON.stringify(_data),
        TopicArn: __classPrivateFieldGet(this, _a, "f", _Topic_topic),
        MessageAttributes: {
            "type": {
                DataType: "String",
                StringValue: _data.type
            }
        }
    };
};
_Topic_topic = { value: void 0 };
//# sourceMappingURL=topic.js.map