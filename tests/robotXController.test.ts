import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'

import IRobotService from '../src/services/IServices/IRobotService'
import RobotController from '../src/controllers/robotController'
import IRobotDTO from '../src/dto/IRobotDTO'
import { Robot } from '../src/domain/robot'

describe('robot controller', function () {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    Container.reset()
    let robotSchemaInstance = require('../src/persistence/schemas/robotSchema').default
    Container.set('robotSchema', robotSchemaInstance)

    let robotRepoClass = require('../src/repos/robotRepo').default
    let robotRepoInstance = Container.get(robotRepoClass)
    Container.set('RobotRepo', robotRepoInstance)

    let robotServiceClass = require('../src/services/robotService').default
    let robotServiceInstance = Container.get(robotServiceClass)
    Container.set('RobotService', robotServiceInstance)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('robotController unit test using robotService stub', async function () {
    // Arrange
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let robotServiceInstance = Container.get('RobotService')
    sinon.stub(robotServiceInstance, 'createRobot').returns(Result.ok<IRobotDTO>({
      id: '123',
      type: req.body.type,
      designation: req.body.designation,
      serialNumber: req.body.serialNumber,
      description: req.body.description,
      available: req.body.available
    }
    ))

    const ctrl = new RobotController(robotServiceInstance as IRobotService)

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      type: req.body.type,
      designation: req.body.designation,
      serialNumber: req.body.serialNumber,
      description: req.body.description,
      available: req.body.available
    }))
  });

  it ('robotController + robotService integration test using robotRepoistory and Robot stubs', async function () {
    // Arrange
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    sinon.stub(Robot, "create").returns(Result.ok({"id": "123", "type": req.body.type, "designation": req.body.designation, "serialNumber": req.body.serialNumber, "description": req.body.description, "available": req.body.available}));

    let robotRepoInstance = Container.get('RobotRepo');
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create({"id": "123", "type": req.body.type, "designation": req.body.designation, "serialNumber": req.body.serialNumber, "description": req.body.description, "available": req.body.available}).getValue())
    }));

    let robotServiceInstance = Container.get('RobotService');
    sinon.stub(robotServiceInstance, "createRobot").returns(Result.ok<IRobotDTO>(
      {
        "id": "123",
        "type": req.body.type,
        "designation": req.body.designation,
        "serialNumber": req.body.serialNumber,
        "description": req.body.description,
        "available": req.body.available,
      }
    ));
    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
          "type": req.body.type,
          "designation": req.body.designation,
          "serialNumber": req.body.serialNumber,
          "description": req.body.description,
          "available": req.body.available,
    }));
  });

  it ('robotController + robotService integration test using spy on robotService', async function () {
    // Arrange
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let robotRepoInstance = Container.get('RobotRepo');
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create({"id": "123", 
      "type": req.body.type, 
      "designation": req.body.designation, 
      "serialNumber": req.body.serialNumber, 
      "description": req.body.description, 
      "available": req.body.available
    }).getValue())
    }));

    let robotServiceInstance = Container.get('RobotService');
    sinon.stub(robotServiceInstance, "createRobot").returns(Result.ok<IRobotDTO>(
      {
        "id": "123",
        "type": req.body.type,
        "designation": req.body.designation,
        "serialNumber": req.body.serialNumber,
        "description": req.body.description,
        "available": req.body.available,
      }
    ));
    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
          "type": req.body.type,
          "designation": req.body.designation,
          "serialNumber": req.body.serialNumber,
          "description": req.body.description,
          "available": req.body.available,
    }));
  });

  it('robotController unit test using robotService mock', async function () {
    // Arrange
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let robotServiceInstance = Container.get('RobotService')
    const robotServiceMock = sinon.mock(robotServiceInstance, 'createRobot')
    robotServiceMock.expects('createRobot')
    .once()
    .withArgs(sinon.match({
      id: '123',
      type: req.body.type,
      designation: req.body.designation,
      serialNumber: req.body.serialNumber,
      description: req.body.description,
      available: req.body.available
      }))
    .returns(Result.ok<IRobotDTO>({
      id: '123',
      type: req.body.type,
      designation: req.body.designation,
      serialNumber: req.body.serialNumber,
      description: req.body.description,
      available: req.body.available
    }));

    const ctrl = new RobotController(robotServiceInstance as IRobotService)

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    robotServiceMock.verify();
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      type: req.body.type,
      designation: req.body.designation,
      serialNumber: req.body.serialNumber,
      description: req.body.description,
      available: req.body.available
    }))
  });

});