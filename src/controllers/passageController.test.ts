import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPassageService from '../services/IServices/IPassageService';
import PassageController from './passageController';
import {IPassageDTO} from '../dto/IPassageDTO';
import PassageRepo from '../repos/passageRepo';
import BuildingRepo from '../repos/buildingRepo';
import FloorRepo from '../repos/floorRepo';
describe('passage contoller', function () {
    beforeEach(function () { });
    it('createPassage: returns json with building1+building2+pisobuilding1+pisobuilding2', async function () {
        let body = {
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy(),
        };
        let next: Partial<NextFunction> = () => { };

        let passageRepoInstance= Container.get(PassageRepo);
        Container.set('PassageRepo', passageRepoInstance);
        let buildingRepoInstance= Container.get(BuildingRepo);
        Container.set('BuildingRepo', buildingRepoInstance);
        let floorRepoInstance= Container.get(FloorRepo);
        Container.set('FloorRepo', floorRepoInstance);
        let passageServiceClass = require(config.services.passage.path).default;
        let passageServiceInstance = Container.get(passageServiceClass);
        Container.set(config.services.passage.name, passageServiceInstance);

        passageServiceInstance = Container.get(config.services.passage.name);
        sinon.stub(passageServiceInstance, 'createPassage').returns(Result.ok<IPassageDTO>({ id:'sad', building1: 'A', building2: 'B', pisobuilding1: 'A1', pisobuilding2: 'B2', positionBuilding1:[],positionBuilding2:[]}));
        const ctrl = new PassageController(passageServiceInstance as IPassageService);
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            id:'sad',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2',
            positionBuilding1:[],
            positionBuilding2:[]
        }));
    });
    it('updatePassage: returns json with id+building1+building2+pisobuilding1+pisobuilding2', async function () {
        let body = {   
            id:'sad',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
         };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy(),
        };
        let next: Partial<NextFunction> = () => { };
        let passageRepoInstance= Container.get(PassageRepo);
        Container.set('PassageRepo', passageRepoInstance);
        let passageServiceClass = require(config.services.passage.path).default;
        let passageServiceInstance = Container.get(passageServiceClass);
        Container.set(config.services.passage.name, passageServiceInstance);
        passageServiceInstance = Container.get(config.services.passage.name);
        sinon.stub(passageServiceInstance, 'updatePassage').returns(Result.ok<IPassageDTO>({ id:'sad', building1: 'A', building2: 'B', pisobuilding1: 'A1', pisobuilding2: 'B2', positionBuilding1:[],positionBuilding2:[]}));
        const ctrl = new PassageController(passageServiceInstance as IPassageService);
        await ctrl.updatePassage(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            id:'sad',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2',
            positionBuilding1:[],
            positionBuilding2:[]
        }));
    });
    it('getPassagesBetween2Buildings: returns json with building1+building2', async function () {
        let body = {   
            building1: 'A',
            building2: 'B',
         };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy(),
        };
        let next: Partial<NextFunction> = () => { };
        let passageRepoInstance= Container.get(PassageRepo);
        Container.set('PassageRepo', passageRepoInstance);
        let passageServiceClass = require(config.services.passage.path).default;
        let passageServiceInstance = Container.get(passageServiceClass);
        Container.set(config.services.passage.name, passageServiceInstance);
        passageServiceInstance = Container.get(config.services.passage.name);
        sinon.stub(passageServiceInstance, 'getPassagesBetween2Buildings').returns(Result.ok<IPassageDTO>({ id:'sad', building1: 'A', building2: 'B', pisobuilding1: 'A1', pisobuilding2: 'B2', positionBuilding1:[],positionBuilding2:[]}));
        const ctrl = new PassageController(passageServiceInstance as IPassageService);
        await ctrl.updatePassage(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            id:'sad',
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2',
            positionBuilding1:[],
            positionBuilding2:[]
        }));
    });
}); 