import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'
import IBuildingService from '../src/services/IServices/IBuildingService'
import BuildingController from '../src/controllers/buildingController'
import IBuildingDTO from '../src/dto/IBuildingDTO'
import { Building } from '../src/domain/building'

describe('building controller', function () {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    Container.reset()
    let buildingSchemaInstance = require('../src/persistence/schemas/buildingSchema').default
    Container.set('buildingSchema', buildingSchemaInstance)

    let buildingRepoClass = require('../src/repos/buildingRepo').default
    let buildingRepoInstance = Container.get(buildingRepoClass)
    Container.set('BuildingRepo', buildingRepoInstance)

    let buildingServiceClass = require('../src/services/buildingService').default
    let buildingServiceInstance = Container.get(buildingServiceClass)
    Container.set('BuildingService', buildingServiceInstance)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('buildingController unit test using buildingService stub', async function () {
    // Arrange
    let body = {
      id : '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let buildingServiceInstance = Container.get('BuildingService')
    sinon.stub(buildingServiceInstance, 'createBuilding').returns(Result.ok<IBuildingDTO>({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }
    ))

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService)

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))
  });

  it ('buildingController + buildingService integration test using buildingRepoistory and Building stubs', async function () {
    // Arrange
    let body = {
      id : '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    sinon.stub(Building, 'create').returns(Result.ok({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))

    let buildingRepoInstance = Container.get('BuildingRepo')
    sinon.stub(buildingRepoInstance, 'save').returns(new Promise<Building>((resolve, reject) => {
      resolve(Building.create({
        id: '123',
        name: req.body.name,
        description: req.body.description,
        depth: req.body.depth,
        width: req.body.width
      }).getValue())
    }))

    let buildingServiceInstance = Container.get('BuildingService')
    sinon.stub(buildingServiceInstance, 'createBuilding').returns(Result.ok<IBuildingDTO>({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService)

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))
  });

  it ('buildingController + buildingService integration test using spy on buildingService', async function () {
    // Arrange
    let body = {
      id : '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let buildingRepoInstance = Container.get('BuildingRepo')
    sinon.stub(buildingRepoInstance, 'save').returns(new Promise<Building>((resolve, reject) => {
      resolve(Building.create({
        id: '123',
        name: req.body.name,
        description: req.body.description,
        depth: req.body.depth,
        width: req.body.width
      }).getValue())
    }))

    let buildingServiceInstance = Container.get('BuildingService')
    sinon.stub(buildingServiceInstance, 'createBuilding').returns(Result.ok<IBuildingDTO>({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService)

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))
  });

it ('buildingController unit test using buildingService mock', async function () {
    // Arrange
    let body = {
      id : '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let buildingServiceInstance = Container.get('BuildingService')
    const buildingServiceMock = sinon.mock(buildingServiceInstance, 'createBuilding')
    buildingServiceMock.expects("createBuilding")
    .once()
    .withArgs(sinon.match({
      id : '123', 
      name: req.body.name, 
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width}))
    .returns(Result.ok<IBuildingDTO>({
      "id":"123",
       "name": req.body.name,
        "description": req.body.description,
         "depth": req.body.depth,
          "width": req.body.width}));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService)

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    buildingServiceMock.verify();
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: req.body.name,
      description: req.body.description,
      depth: req.body.depth,
      width: req.body.width
    }))
  });
    
  
});

