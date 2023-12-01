import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import url from 'url';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IFloorService from '../services/IServices/IFloorService';
import FloorController from "./floorController";
import IFloorDTO from '../dto/IFloorDTO';
import BuildingRepo from '../repos/buildingRepo';
import FloorRepo from '../repos/floorRepo';
import PassageRepo from '../repos/passageRepo';
import IPassageService from '../services/IServices/IPassageService';
import IElevatorService from '../services/IServices/IElevatorService';
import IRoomService from '../services/IServices/IRoomService';
import { IPassageDTO } from '../dto/IPassageDTO';

describe('floor controller', function () {

  beforeEach(function () { });

  it('createFloor: returns json with values', async function () {
    let body = {
      id: '123',
      name: 'X1',
      buildingName: 'X',
      description: 'piso de LEI',
      map: [1][1]
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    // Create an instance of RoleRepo
    let buildingRepoInstance = Container.get(BuildingRepo);
    Container.set('BuildingRepo', buildingRepoInstance);// Register BuildingRepo in the container
    // Create an instance of FloorRepo
    let floorRepoInstance = Container.get(FloorRepo);
    Container.set('FloorRepo', floorRepoInstance); // Register FloorRepo in the container

    let floorServiceClass = require(config.services.floor.path).default;
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set(config.services.floor.name, floorServiceInstance);

    floorServiceInstance = Container.get(config.services.floor.name);

    let passageRepoInstance = Container.get(PassageRepo);
    Container.set('PassageRepo', passageRepoInstance);// Register PassageRepo in the container
    let passageServiceClass = require(config.services.passage.path).default;
    let passageServiceInstance = Container.get(passageServiceClass)
    Container.set(config.services.passage.name, passageServiceInstance);


    passageServiceInstance = Container.get(config.services.passage.name);

    let elevatorRepoInstance = Container.get(PassageRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register PassageRepo in the container
    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);


    elevatorServiceInstance = Container.get(config.services.elevator.name);


    let roomRepoInstance = Container.get(PassageRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register PassageRepo in the container
    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);


    roomServiceInstance = Container.get(config.services.room.name);



    sinon.stub(floorServiceInstance, "createFloor").
      returns(Result.ok<IFloorDTO>(
        {
          "id": "123",
          "name": req.body.name,
          "buildingName": req.body.buildingName,
          "description": req.body.description,
          "map": req.body.map


        }
      ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
      elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "description": req.body.description,
      "map": req.body.map
    }));

  });


  it('updateFloor: returns json with values', async function () {
    let body = {
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };


    let floorServiceClass = require(config.services.floor.path).default;
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set(config.services.floor.name, floorServiceInstance);

    floorServiceInstance = Container.get(config.services.floor.name);

    let passageRepoInstance = Container.get(PassageRepo);
    Container.set('PassageRepo', passageRepoInstance);// Register PassageRepo in the container
    let passageServiceClass = require(config.services.passage.path).default;
    let passageServiceInstance = Container.get(passageServiceClass)
    Container.set(config.services.passage.name, passageServiceInstance);


    passageServiceInstance = Container.get(config.services.passage.name);

    let elevatorRepoInstance = Container.get(PassageRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register PassageRepo in the container
    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);


    elevatorServiceInstance = Container.get(config.services.elevator.name);


    let roomRepoInstance = Container.get(PassageRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register PassageRepo in the container
    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);


    roomServiceInstance = Container.get(config.services.room.name);

    sinon.stub(floorServiceInstance, "updateFloor").
      returns(Result.ok<IFloorDTO>(
        {
          "id": "123",
          "name": req.body.name,
          "buildingName": req.body.buildingName,
          "description": req.body.description,
          "map": req.body.map
        }
      ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
      elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "buildingName": req.body.buildingName,
      "description": req.body.description,
      "map": req.body.map
    }));

  }
  );





  it('getallFloors: returns json with values', async function () {
    let body = {
      id: '123',
      name: 'X1',
      buildingName: 'X',
      description: 'piso de LEI',
      map: [1][1]
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };
    let floorServiceClass = require(config.services.floor.path).default;
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set(config.services.floor.name, floorServiceInstance);

    floorServiceInstance = Container.get(config.services.floor.name);

    let passageRepoInstance = Container.get(PassageRepo);
    Container.set('PassageRepo', passageRepoInstance);// Register PassageRepo in the container
    let passageServiceClass = require(config.services.passage.path).default;
    let passageServiceInstance = Container.get(passageServiceClass)
    Container.set(config.services.passage.name, passageServiceInstance);


    passageServiceInstance = Container.get(config.services.passage.name);

    let elevatorRepoInstance = Container.get(PassageRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register PassageRepo in the container
    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);


    elevatorServiceInstance = Container.get(config.services.elevator.name);


    let roomRepoInstance = Container.get(PassageRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register PassageRepo in the container
    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);


    roomServiceInstance = Container.get(config.services.room.name);
    sinon.stub(floorServiceInstance, "getallFloors").
      returns(Result.ok<IFloorDTO[]>(
        [
          {
            "id": "123",
            "name": req.body.name,
            "buildingName": req.body.buildingName,
            "description": req.body.description,
            "map": req.body.map
          }
        ]
      ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
      elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    await ctrl.getallFloors(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([
      {
        "id": "123",
        "name": req.body.name,
        "buildingName": req.body.buildingName,
        "description": req.body.description,
        "map": req.body.map
      }
    ]));


  });


  it('findByBuildingName: returns json with values', async function () {
    let queryParams = {
      buildingName: 'L'
    };
    let req: Partial<Request> = {
      url: url.format({
        pathname: '/:buildingName',
        query: queryParams
      })
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };
    let floorServiceClass = require(config.services.floor.path).default;
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set(config.services.floor.name, floorServiceInstance);

    floorServiceInstance = Container.get(config.services.floor.name);

    let passageRepoInstance = Container.get(PassageRepo);
    Container.set('PassageRepo', passageRepoInstance);// Register PassageRepo in the container
    let passageServiceClass = require(config.services.passage.path).default;
    let passageServiceInstance = Container.get(passageServiceClass)
    Container.set(config.services.passage.name, passageServiceInstance);


    passageServiceInstance = Container.get(config.services.passage.name);

    let elevatorRepoInstance = Container.get(PassageRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register PassageRepo in the container
    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);


    elevatorServiceInstance = Container.get(config.services.elevator.name);


    let roomRepoInstance = Container.get(PassageRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register PassageRepo in the container
    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);


    roomServiceInstance = Container.get(config.services.room.name);
    sinon.stub(floorServiceInstance, 'findFloorsByBuildingName').returns(Result.ok<IFloorDTO>({
      id: '123', name: 'L1', buildingName: 'L', description: 'Piso', map: null
    }));
    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
      elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);
    await ctrl.findFloorsByBuildingName(<Request>req, <Response>res, <NextFunction>next);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      id: '123',
      name: 'L1',
      buildingName: 'L',
      description: 'Piso',
      map: null
    }));
  });

  it('findFloorsWithPassages: returns json with values', async function () {
    let body = {
      id: '123',
      name: 'X1',
      buildingName: 'X',
      description: 'piso de LEI',
      map: [1][1]
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };
    let floorServiceClass = require(config.services.floor.path).default;
    let floorServiceInstance = Container.get(floorServiceClass)
    Container.set(config.services.floor.name, floorServiceInstance);

    floorServiceInstance = Container.get(config.services.floor.name);

    let passageRepoInstance = Container.get(PassageRepo);
    Container.set('PassageRepo', passageRepoInstance);// Register PassageRepo in the container
    let passageServiceClass = require(config.services.passage.path).default;
    let passageServiceInstance = Container.get(passageServiceClass)
    Container.set(config.services.passage.name, passageServiceInstance);


    passageServiceInstance = Container.get(config.services.passage.name);

    let elevatorRepoInstance = Container.get(PassageRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register PassageRepo in the container
    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);


    elevatorServiceInstance = Container.get(config.services.elevator.name);


    let roomRepoInstance = Container.get(PassageRepo);
    Container.set('RoomRepo', roomRepoInstance);// Register PassageRepo in the container
    let roomServiceClass = require(config.services.room.path).default;
    let roomServiceInstance = Container.get(roomServiceClass)
    Container.set(config.services.room.name, roomServiceInstance);


    roomServiceInstance = Container.get(config.services.room.name);
    sinon.stub(floorServiceInstance, "findFloorsWithPassages").
      returns(Result.ok<IFloorDTO[]>(
        [
          {
            "id": "123",
            "name": req.body.name,
            "buildingName": req.body.buildingName,
            "description": req.body.description,
            "map": req.body.map
          }
        ]
      ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService, passageServiceInstance as IPassageService,
      elevatorServiceInstance as IElevatorService, roomServiceInstance as IRoomService);

    await ctrl.findFloorsWithPassages(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([
      {
        "id": "123",
        "name": req.body.name,
        "buildingName": req.body.buildingName,
        "description": req.body.description,
        "map": req.body.map
      }
    ]));


  });


});