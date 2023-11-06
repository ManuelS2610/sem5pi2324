import 'reflect-metadata'

import * as sinon from 'sinon'
import { Response, Request, NextFunction } from 'express'
import { Container } from 'typedi'
import { Result } from '../src/core/logic/Result'
 
import IRoomService from '../src/services/IServices/IRoomService'
import RoomController from '../src/controllers/roomController'
import IRoomDTO from '../src/dto/IRoomDTO'
import { Room } from '../src/domain/room'

describe('room controller', function () {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    Container.reset()
    let roomSchemaInstance = require('../src/persistence/schemas/roomSchema').default
    Container.set('roomSchema', roomSchemaInstance)

    let roomRepoClass = require('../src/repos/roomRepo').default
    let roomRepoInstance = Container.get(roomRepoClass)
    Container.set('RoomRepo', roomRepoInstance)

    let roomServiceClass = require('../src/services/roomService').default
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set('RoomService', roomServiceInstance)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('roomController unit test using roomService stub', async function () {
    // Arrange
    let body = {
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }
    let req: Partial<Request> = {}
    req.body = body
    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let roomServiceInstance = Container.get('RoomService')
    sinon.stub(roomServiceInstance, 'createRoom').returns(Result.ok<IRoomDTO>({
      id: '123',
      category: req.body.category,
      description: req.body.description,
      floor: req.body.floor,
      position: req.body.position,
      distX: 10,
      distY: 10
    }
    ))

    const ctrl = new RoomController(roomServiceInstance as IRoomService)

    // Act
    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({ 
      id: '123', 
      category: 'X', 
      description: 'Edificio de LEI', 
      floor: '1', 
      position: [1, 1], 
      distX: 10, 
      distY: 10 
    }))
  });

  it ('roomController + roomService integration test using roomRepoistory and Room stubs', async function () {
    // Arrange
    let body = {
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }
    let req: Partial<Request> = {}
    req.body = body

    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    sinon.stub(Room, 'create').returns(Result.ok({ 
      id: '123', 
      category: req.body.category, 
      description: req.body.description, 
      floor: req.body.floor, 
      position: req.body.position, 
      distX: 10, 
      distY: 10 
    }))

    let roomRepoInstance = Container.get('RoomRepo')
    sinon.stub(roomRepoInstance, 'save').returns(new Promise<Room>((resolve, reject) => {
      resolve(Room.create({ 
        id: '123', 
        category: req.body.category, 
        description: req.body.description, 
        floor: req.body.floor, 
        position: req.body.position, 
        distX: 10, 
        distY: 10 
      }).getValue())
    }))

    let roomServiceInstance = Container.get('RoomService')

sinon.stub(roomServiceInstance, 'createRoom').returns(Result.ok<IRoomDTO>({
      id: '123',
      category: req.body.category,
      description: req.body.description,
      floor: req.body.floor,
      position: req.body.position,
      distX: 10,
      distY: 10
    }
    ))

    const ctrl = new RoomController(roomServiceInstance as IRoomService)
    // Act
    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({ 
      id: '123', 
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }))
  });

  it ('roomController + roomService integration test using spy on roomService', async function () {
    // Arrange
    let body = {
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }
    let req: Partial<Request> = {}
    req.body = body

    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let roomRepoInstance = Container.get('RoomRepo')
    sinon.stub(roomRepoInstance, 'save').returns(new Promise<Room>((resolve, reject) => {
      resolve(Room.create({ 
        id: '123', 
        category: req.body.category, 
        description: req.body.description, 
        floor: req.body.floor, 
        position: req.body.position, 
        distX: 10, 
        distY: 10 
      }).getValue())
    }))

    let roomServiceInstance = Container.get('RoomService')
    sinon.stub(roomServiceInstance, 'createRoom').returns(Result.ok<IRoomDTO>({
      id: '123',
      category: req.body.category,
      description: req.body.description,
      floor: req.body.floor,
      position: req.body.position,
      distX: 10,
      distY: 10
    }
    ))

    const ctrl = new RoomController(roomServiceInstance as IRoomService)

    // Act
    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({ 
      id: '123', 
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }))
  });

  it ('roomController unit test using roomService mock', async function () {
    // Arrange
    let body = {
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }
    let req: Partial<Request> = {}
    req.body = body

    let res: Partial<Response> = {
      json: sinon.spy()
    }
    let next: Partial<NextFunction> = () => {}

    let roomServiceInstance = Container.get('RoomService')
    const roomServiceMock = sinon.mock(roomServiceInstance, 'createRoom')
    roomServiceMock.expects('createRoom')
    .once()
    .withArgs({
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    })
    .returns(Result.ok<IRoomDTO>({
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }));

    const ctrl = new RoomController(roomServiceInstance as IRoomService)

    // Act
    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next)

    // Assert
    roomServiceMock.verify()
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, sinon.match({ 
      id: '123', 
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    }))
  });

});
