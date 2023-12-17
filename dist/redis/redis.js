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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
const connectionRedis_1 = require("../utils/connectionRedis");
const setGetFunctions_1 = require("./setGetFunctions");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 8200;
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { test } = req.query;
        if (test) {
            yield connectionRedis_1.client.get("test");
            yield connectionRedis_1.client.set("test", String(test));
        }
        const data = yield connectionRedis_1.client.get("test");
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/saveuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log('kfntkong');
        const data = yield (0, setGetFunctions_1.saveCredentials)(username, password);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/getuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const data = yield (0, setGetFunctions_1.getCredentials)(username);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/savearraycredentials", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernames } = req.body;
        const data = yield (0, setGetFunctions_1.saveArrayCredentials)(usernames);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/getarraycredentials", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usernames } = req.body;
        const data = yield (0, setGetFunctions_1.getArrayCredentials)(usernames);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/setjsondata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obj, key } = req.body;
        const data = yield (0, setGetFunctions_1.saveJSONToRedis)(key, obj);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.get("/getjsondata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, setGetFunctions_1.getJSONfromRedis)();
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.get("/getfieldjsondata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, setGetFunctions_1.getFieldJSONfromRedis)();
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/setorupdatearrjsondata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jsonData } = req.body;
        console.log(jsonData);
        const data = yield (0, setGetFunctions_1.storeOrUpdateObjects)(jsonData);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.get("/getentitiesbyname:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const data = yield (0, setGetFunctions_1.getEntitiesByUserName)(name);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.get("/getEntitiesByEntityType:entitytype", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entityType = req.params.entitytype;
        const data = yield (0, setGetFunctions_1.getEntitiesByEntityType)(entityType);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.post("/getEntitiesByEntityTypeAndName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { entitytype, name } = req.body;
    try {
        const data = yield (0, setGetFunctions_1.getEntitiesByTypeAndUserName)(entitytype, name);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(chalk_1.default.redBright(error.message));
            res.send(error.message);
        }
    }
}));
app.listen(port, () => {
    console.log(chalk_1.default.blueBright(`listening on: ${8200}`));
    connectionRedis_1.client.connect()
        .then(() => console.log(chalk_1.default.magentaBright(`connected successfully to Redis client!!! 🆒 😎`)))
        .catch((error) => {
        if (error instanceof Error) {
            console.log(error.message);
        }
    });
});
