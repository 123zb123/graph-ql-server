"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const cron = __importStar(require("cron"));
// כל דקה הפונקציה נדלקת 
let i = 0;
const job = new cron.CronJob('1 * * * * *', () => {
    i++;
    console.log('Cron job executed!' + i);
});
// job.start();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'a548492309@gmail.com',
        pass: 'jqfv rlsr xqmt trjm'
    }
});
exports.mailOptions = {
    from: 'a548492309@gmail.com',
    to: 'a548492309@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
exports.transporter.sendMail(exports.mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});
