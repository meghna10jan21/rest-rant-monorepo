"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg: any, _arguments: any, P: PromiseConstructor, generator: { [x: string]: (arg0: any) => any; next: (arg0: any) => any; apply: (arg0: any, arg1: any) => any; }) {
    function adopt(value: any) { return value instanceof P ? value : new P(function (resolve: (arg0: any) => void) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve: (arg0: any) => any, reject: (arg0: any) => void) {
        function fulfilled(value: any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value: any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result: { done: any; value: any; }) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const router = require('express').Router();
import db from "../models";
const { Place, Comment, User } = db;
router.post('/', (req: { body: { pic: string; city: string; state: string; }; }, res: { json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400';
    }
    if (!req.body.city) {
        req.body.city = 'Anytown';
    }
    if (!req.body.state) {
        req.body.state = 'USA';
    }
    const place = yield Place.create(req.body);
    res.json(place);
}));
router.get('/', (req: any, res: { json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield Place.findAll();
    res.json(places);
}));
router.get('/:placeId', (req: { params: { placeId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: { placeId: placeId },
            include: {
                association: 'comments',
                include: 'author'
            }
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            res.json(place);
        }
    }
}));
router.put('/:placeId', (req: { params: { placeId: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: { placeId: placeId },
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            Object.assign(place, req.body);
            yield place.save();
            res.json(place);
        }
    }
}));
router.delete('/:placeId', (req: { params: { placeId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    let placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else {
        const place = yield Place.findOne({
            where: {
                placeId: placeId
            }
        });
        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
        }
        else {
            yield place.destroy();
            res.json(place);
        }
    }
}));
router.post('/:placeId/comments', (req: { params: { placeId: any; }; body: { rant: boolean; authorId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = Number(req.params.placeId);
    req.body.rant = req.body.rant ? true : false;
    const place = yield Place.findOne({
        where: { placeId: placeId }
    });
    if (!place) {
        res.status(404).json({ message: `Could not find place with id "${placeId}"` });
    }
    const author = yield User.findOne({
        where: { userId: req.body.authorId }
    });
    if (!author) {
        res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` });
    }
    const comment = yield Comment.create(Object.assign(Object.assign({}, req.body), { placeId: placeId }));
    res.send(Object.assign(Object.assign({}, comment.toJSON()), { author }));
}));
router.delete('/:placeId/comments/:commentId', (req: { params: { placeId: any; commentId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => __awaiter(void 0, void 0, void 0, function* () {
    let placeId = Number(req.params.placeId);
    let commentId = Number(req.params.commentId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    }
    else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` });
    }
    else {
        const comment = yield Comment.findOne({
            where: { commentId: commentId, placeId: placeId }
        });
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${commentId}" for place with id "${placeId}"` });
        }
        else {
            yield comment.destroy();
            res.json(comment);
        }
    }
}));
module.exports = router;
