import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'
import IElevatorService from '../src/services/IServices/IElevatorService'
import ElevatorController from '../src/controllers/elevatorController'
import { Elevator } from '../src/domain/elevator'
import { IElevatorDTO } from '../src/dto/IElevatorDTO'

describe('elevator controller', function () {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    Container.reset()
    let elevatorSchemaInstance = require('../src/persistence/schemas/elevatorSchema').default
    Container.set('elevatorSchema', elevatorSchemaInstance)

    let elevatorRepoClass = require('../src/repos/elevatorRepo').default
    let elevatorRepoInstance = Container.get(elevatorRepoClass)
    Container.set('ElevatorRepo', elevatorRepoInstance)

    let elevatorServiceClass = require('../src/services/elevatorService').default
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set('ElevatorService', elevatorServiceInstance)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('elevatorController unit test using elevatorService stub', async function () {
    // Arrange
    let body = {
        id: '123',
        buildingName: 'X',
        floors: ["1", "2", "3", "4"],
        position: [1,1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let elevatorServiceInstance = Container.get('ElevatorService')
    sinon.stub(elevatorServiceInstance, 'createElevator').returns(Result.ok<IElevatorDTO>({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }
    ))

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService)

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }))
  });

  it ('elevatorController + elevatorService integration test using elevatorRepoistory and Elevator stubs', async function () {
    // Arrange
    let body = {
        id: '123',
        buildingName: 'X',
        floors: ["1", "2", "3", "4"],
        position: [1,1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    sinon.stub(Elevator, 'create').returns(Result.ok({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }))

    let elevatorRepoInstance = Container.get('ElevatorRepo')
    sinon.stub(elevatorRepoInstance, 'save').returns(new Promise<Elevator>((resolve, reject) => {
      resolve(Elevator.create({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
      }).getValue())
    }))

    let elevatorServiceInstance = Container.get('ElevatorService')
    sinon.stub(elevatorServiceInstance, 'createElevator').returns(Result.ok<IElevatorDTO>({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }))

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService)

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }))
  });

  it ('elevatorController + elevatorService integration test using spy on elevatorService', async function () {
    // Arrange
    let body = {
        id: '123',
        buildingName: 'X',
        floors: ["1", "2", "3", "4"],
        position: [1,1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let elevatorRepoInstance = Container.get('ElevatorRepo')
    sinon.stub(elevatorRepoInstance, 'save').returns(new Promise<Elevator>((resolve, reject) => {
      resolve(Elevator.create({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
      }).getValue())
    }))

    let elevatorServiceInstance = Container.get('ElevatorService')
    sinon.stub(elevatorServiceInstance, 'createElevator').returns(Result.ok<IElevatorDTO>({
      id: "123",
      buildingName: req.body.buildingName,
      floors: req.body.floors,
      position: req.body.position
    }))

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService)

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
      id: "123",
      buildingName: req.body.buildingName,
      floors: req.body.floors,
      position: req.body.position
    }))
  });

it ('elevatorController unit test using elevatorService mock', async function () {
    // Arrange
    let body = {
        id: '123',
        buildingName: 'X',
        floors: ["1", "2", "3", "4"],
        position: [1,1]
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let elevatorServiceInstance = Container.get('ElevatorService')
    const elevatorServiceMock = sinon.mock(elevatorServiceInstance, 'createElevator')
    elevatorServiceMock.expects("createElevator")
    .once()
    .withArgs(sinon.match({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position}))
    .returns(Result.ok<IElevatorDTO>({
        "id": "123",
        "buildingName": req.body.buildingName,
          "floors": req.body.floors,
          "position": req.body.position}));

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService)

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    elevatorServiceMock.verify();
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({
        id: "123",
        buildingName: req.body.buildingName,
        floors: req.body.floors,
        position: req.body.position
    }))
  });
    
  
});

