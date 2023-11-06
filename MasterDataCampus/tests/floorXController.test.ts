import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'

import IFloorService from '../src/services/IServices/IFloorService'
import FloorController from '../src/controllers/floorController'
import IFloorDTO from '../src/dto/IFloorDTO'
import { Floor } from '../src/domain/floor'
import IPassageService from '../src/services/IServices/IPassageService'
import IRoomService from '../src/services/IServices/IRoomService'
import IElevatorService from '../src/services/IServices/IElevatorService'


describe('floor controller', function () {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    Container.reset()
    let floorSchemaInstance = require('../src/persistence/schemas/floorSchema').default
    Container.set('floorSchema', floorSchemaInstance)

    let floorRepoClass = require('../src/repos/floorRepo').default
    let floorRepoInstance = Container.get(floorRepoClass)
    Container.set('FloorRepo', floorRepoInstance)

    let floorServiceClass = require('../src/services/floorService').default
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set('FloorService', floorServiceInstance)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('floorController unit test using floorService stub', async function () {
    // Arrange
    let body = {
      id: '123',
      name: 'X1',
      buildingName: 'X',
      description: 'piso de LEI',
      map: [1][1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let floorServiceInstance = Container.get('FloorService')
    sinon.stub(floorServiceInstance,'createFloor').returns(Result.ok<IFloorDTO>({
      id: '123',
      name: req.body.name,
      buildingName: req.body.buildingName,
      description: req.body.description,
      map: req.body.map
    }
    ))


    let passageServiceInstance = Container.get('PassageRepo');


    let elevatorServiceInstance = Container.get('ElevatorRepo');

    let roomServiceInstance = Container.get('RoomRepo');
    


    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
        elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    // Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: req.body.name,
        buildingName: req.body.buildingName,
        description: req.body.description,
        map: req.body.map
    }))
  });

  it ('floorController + floorService integration test using floorRepository and Floor stubs', async function () {
    // Arrange
    let body = {
        id: '123',
        name: 'X1',
        buildingName: 'X',
        description: 'piso de LEI',
        map: [1][1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    sinon.stub(Floor, "create").returns(Result.ok(
        {"id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map}));

    let floorRepoInstance = Container.get('FloorRepo');
    sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
      resolve(Floor.create({
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map}).getValue())
    }));

    let floorServiceInstance = Container.get('FloorService');
    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>(
      {
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
      }
    
    ));
    let passageServiceInstance = Container.get('PassageRepo');


    let elevatorServiceInstance = Container.get('ElevatorRepo');

    let roomServiceInstance = Container.get('RoomRepo');
    


    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
        elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    // Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
    }));
  });

  it ('floorController + floorService integration test using spy on floorService', async function () {
    // Arrange
    let body = {
        id: '123',
        name: 'X1',
        buildingName: 'X',
        description: 'piso de LEI',
        map: [1][1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let floorRepoInstance = Container.get('FloorRepo');
    sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
      resolve(Floor.create({
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
    }).getValue())
    }));

    let floorServiceInstance = Container.get('FloorService');
    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>(
      {
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
      }
    ));
    let passageServiceInstance = Container.get('PassageRepo');


    let elevatorServiceInstance = Container.get('ElevatorRepo');

    let roomServiceInstance = Container.get('RoomRepo');
    


    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
        elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    // Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        "id": "123",
        "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
    }));
  });

  it('floorController unit test using floorService mock', async function () {
    // Arrange
    let body = {
        id: '123',
        name: 'X1',
        buildingName: 'X',
        description: 'piso de LEI',
        map: [1][1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let floorServiceInstance = Container.get('FloorService')
    const floorServiceMock = sinon.mock(floorServiceInstance, 'createFloor')
    floorServiceMock.expects('createFloor')
    .once()
    .withArgs(sinon.match({
        id: '123',
        name: req.body.name,
          buildingName: req.body.buildingName,
          description: req.body.description,
          map: req.body.map
      }))
    .returns(Result.ok<IFloorDTO>({
        id: '123',
      name: req.body.name,
        buildingName: req.body.buildingName,
        description: req.body.description,
        map: req.body.map
    }));

    let passageServiceInstance = Container.get('PassageRepo');


    let elevatorServiceInstance = Container.get('ElevatorRepo');

    let roomServiceInstance = Container.get('RoomRepo');
    


    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
        elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    // Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    floorServiceMock.verify();
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
        id: '123',
        name: req.body.name,
          buildingName: req.body.buildingName,
          description: req.body.description,
          map: req.body.map
    }))
  });

});