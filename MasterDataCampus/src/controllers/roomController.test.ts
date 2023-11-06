import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IRoomService from '../services/IServices/IRoomService';
import RoomController from "./roomController";
import IRoomDTO from '../dto/IRoomDTO';
import RoomRepo from '../repos/roomRepo';
import FloorRepo from '../repos/floorRepo';

describe('room controller', function () {

  beforeEach(function () { });

  it('createRoom: returns json with values', async function () {
    let body = {
      id: '123',
      category: 'X',
      description: 'Edificio de LEI',
      floor: '1',
      position: [1, 1],
      distX: 10,
      distY: 10
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    // Create an instance of RoomRepo
    let roomRepoInstance = Container.get(RoomRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register RoomRepo in the container
    // Create an instance of FloorRepo
    let floorRepoInstance = Container.get(FloorRepo);
    Container.set('FloorRepo', floorRepoInstance); // Register FloorRepo in the container

    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);

    roomServiceInstance = Container.get(config.services.room.name);
    sinon.stub(roomServiceInstance, "createRoom").
      returns(Result.ok<IRoomDTO>(
        {
          "id": "123",
          "category": req.body.category,
          "description": req.body.description,
          "floor": req.body.floor,
          "position": req.body.position,
          "distX": 10,
          "distY": 10
        }
      ));

    const ctrl = new RoomController(roomServiceInstance as IRoomService);

    await ctrl.createRoom(req as Request, res as Response, next as NextFunction);
    sinon.assert.calledOnce(res.json as sinon.SinonSpy);
    sinon.assert.calledWith(res.json as sinon.SinonSpy, sinon.match({ "id": "123", "category": "X", "description": "Edificio de LEI", "floor": "1", "position": [1, 1], "distX": 10, "distY": 10 }));
  }
  );

  it('updateRoom: returns json with values', async function () {

    let body = {
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    // Create an instance of RoomRepo
    let roomRepoInstance = Container.get(RoomRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register RoomRepo in the container
    // Create an instance of FloorRepo
    let floorRepoInstance = Container.get(FloorRepo);
    Container.set('FloorRepo', floorRepoInstance); // Register FloorRepo in the container

    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);

    roomServiceInstance = Container.get(config.services.room.name);
    sinon.stub(roomServiceInstance, "updateRoom").
      returns(Result.ok<IRoomDTO>(
        {
          "id": "123",
          "category": req.body.category,
          "description": req.body.description,
          "floor": req.body.floor,
          "position": req.body.position,
          "distX": req.body.distX,
          "distY": req.body.distY
        }
      ));

    const ctrl = new RoomController(roomServiceInstance as IRoomService);

    await ctrl.updateRoom(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json,sinon.match({
      "id": "123",
      "category": req.body.category,
      "description": req.body.description,
      "floor": req.body.floor,
      "position": req.body.position,
      "distX": req.body.distX,
      "distY": req.body.distY
    }));


  });
});
