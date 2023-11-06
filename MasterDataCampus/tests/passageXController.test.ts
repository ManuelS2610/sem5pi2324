import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'
import IPassageService from '../src/services/IServices/IPassageService'
import { Passage } from '../src/domain/passage'
import { IPassageDTO } from '../src/dto/IPassageDTO'
import PassageController from '../src/controllers/passageController'
describe('passage contoller', function () {
    const sandbox = sinon.createSandbox()
    beforeEach(function () {
        Container.reset()
        let passageSchemaInstance = require('../src/persistence/schemas/passageSchema').default
        Container.set('passageSchema', passageSchemaInstance)
        let passageRepoClass = require('../src/repos/passageRepo').default
        let passageRepoInstance = Container.get(passageRepoClass)
        Container.set('PassageRepo', passageRepoInstance)
        let passageServiceClass = require('../src/services/passageService').default
        let passageServiceInstance = Container.get(passageServiceClass)
        Container.set('PassageService', passageServiceInstance)
    })
    afterEach(function () {
        sandbox.restore()
    })
    it('passageController unit test using passageService stub', async function () {
        // Arrange
        let body = {
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
        }
        let req: Partial<Request> = {}
        req.body = body
        let res: Partial<Response> = {
            json: sinon.spy()
        }
        let next: Partial<NextFunction> = () => { }
        let passageServiceInstance = Container.get('PassageService')
        sinon.stub(passageServiceInstance, 'createPassage').returns(Result.ok({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2
        }
        ))
        const ctrl = new PassageController(passageServiceInstance as IPassageService)
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next)
        sinon.assert.calledOnce(res.json)
        sinon.assert.calledWith(res.json, sinon.match({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2
        }))
    });
    it('PassageController + passageService integration test using passageRepoistory and Passage stubs', async function () {
        // Arrange
        let body = {
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
        }
        let req: Partial<Request> = {}
        req.body = body
        let res: Partial<Response> = {
            json: sinon.spy()
        }
        let next: Partial<NextFunction> = () => { }

        sinon.stub(Passage, 'create').returns(Result.ok({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2
        }))

        let passageRepoInstance = Container.get('PassageRepo')
        sinon.stub(passageRepoInstance, 'save').returns(new Promise<Passage>((resolve, reject) => {
            resolve(Passage.create({
                id: '123',
                building1: req.body.building1,
                building2: req.body.building2,
                pisobuilding1: req.body.pisobuilding1,
                pisobuilding2: req.body.pisobuilding2,
                positionBuilding1: [],
                positionBuilding2: []
            }).getValue())
        }))

        let passageServiceInstance = Container.get('PassageService')
        sinon.stub(passageServiceInstance, 'createPassage').returns(Result.ok<IPassageDTO>({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2,
            positionBuilding1: [],
            positionBuilding2: []
        }))

        const ctrl = new PassageController(passageServiceInstance as IPassageService)

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next)

        // Assert
        sinon.assert.calledOnce(res.json)
        sinon.assert.calledWith(res.json, sinon.match({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2,
            positionBuilding1: [],
            positionBuilding2: []
        }))
    });
    it('passageController + passageService integration test using spy on passageService', async function () {
        // Arrange
        let body = {
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
        }
        let req: Partial<Request> = {}
        req.body = body
        let res: Partial<Response> = {
            json: sinon.spy()
        }
        let next: Partial<NextFunction> = () => { }

        let passageRepoInstance = Container.get('PassageRepo')
        sinon.stub(passageRepoInstance, 'save').returns(new Promise<Passage>((resolve, reject) => {
            resolve(Passage.create({
                id: '123',
                building1: req.body.building1,
                building2: req.body.building2,
                pisobuilding1: req.body.pisobuilding1,
                pisobuilding2: req.body.pisobuilding2,
                positionBuilding1: [],
                positionBuilding2: []
            }).getValue())
        }))

        let passageServiceInstance = Container.get('PassageService')
        sinon.stub(passageServiceInstance, 'createPassage').returns(Result.ok<IPassageDTO>({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2,
            positionBuilding1: [],
            positionBuilding2: []
        }))

        const ctrl = new PassageController(passageServiceInstance as IPassageService)

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next)

        // Assert
        sinon.assert.calledOnce(res.json)
        sinon.assert.calledWith(res.json, sinon.match({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2,
            positionBuilding1: [],
            positionBuilding2: []
        }))
    });
    it('passageController unit test using passageService mock', async function () {
        // Arrange
        let body = {
            building1: 'A',
            building2: 'B',
            pisobuilding1: 'A1',
            pisobuilding2: 'B2'
        }
        let req: Partial<Request> = {}
        req.body = body
        let res: Partial<Response> = {
            json: sinon.spy()
        }
        let next: Partial<NextFunction> = () => { }

        let passageServiceInstance = Container.get('PassageService')
        const passageServiceMock = sinon.mock(passageServiceInstance, 'createPassage')
        passageServiceMock.expects("createPassage")
            .once()
            .withArgs(sinon.match({
                building1: req.body.building1,
                building2: req.body.building2,
                pisobuilding1: req.body.pisobuilding1,
                pisobuilding2: req.body.pisobuilding2
            }))
            .returns(Result.ok<IPassageDTO>({
                id: "123",
                building1: req.body.building1,
                building2: req.body.building2,
                pisobuilding1: req.body.pisobuilding1,
                pisobuilding2: req.body.pisobuilding2,
                positionBuilding1: [],
                positionBuilding2: []
            }));

        const ctrl = new PassageController(passageServiceInstance as IPassageService)

        // Act
        await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>next)

        // Assert
        passageServiceMock.verify();
        sinon.assert.calledOnce(res.json)
        sinon.assert.calledWith(res.json, sinon.match({
            id: '123',
            building1: req.body.building1,
            building2: req.body.building2,
            pisobuilding1: req.body.pisobuilding1,
            pisobuilding2: req.body.pisobuilding2,
            positionBuilding1: [],
            positionBuilding2: []
        }))
    });
});