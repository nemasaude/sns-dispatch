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
var _a, _Topic_topic;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
class Topic {
    static setup(topicUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _a, topicUrl, "f", _Topic_topic);
        });
    }
    static publish(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!params.TopicArn) {
                    params = Object.assign(Object.assign({}, params), { TopicArn: __classPrivateFieldGet(this, _a, "f", _Topic_topic) });
                }
                const info = yield new AWS.SNS({ apiVersion: '2010-03-31' }).publish(Object.assign(Object.assign({}, params), { TopicArn: __classPrivateFieldGet(this, _a, "f", _Topic_topic) })).promise();
                console.log("MessageID is " + info.MessageId);
                // console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            }
            catch (err) {
                console.error(err, err.stack);
            }
        });
    }
}
exports.default = Topic;
_a = Topic;
_Topic_topic = { value: void 0 };
//# sourceMappingURL=topic.js.map