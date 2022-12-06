"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg: any, _arguments: any, P: PromiseConstructor, generator: { [x: string]: (arg0: any) => { done: any; value: any; }; next: (arg0: any) => { done: any; value: any; }; apply: (arg0: any, arg1: any) => any; }) {
    function adopt(value: any) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result: { done: any; value: any; }) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require('express').Router();
import db from "../models";
const { User } = db;
router.post('/', (req: { body: any; }, res: { json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.create(req.body);
    res.json(user);
}));
router.get('/', (req: any, res: { json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll();
    res.json(users);
}));
module.exports = router;
