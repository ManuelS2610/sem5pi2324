import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IElevatorService from '../services/IServices/IElevatorService';
import ElevatorController from "./elevatorController";
import ElevatorRepo from '../repos/elevatorRepo';
import FloorRepo from '../repos/floorRepo';
import { IElevatorDTO } from '../dto/IElevatorDTO';

describe('elevator controller', function () {

  beforeEach(function () { });

  it('createElevator: returns json with values', async function () {
    let body = {
      id: '123',
      buildingName: 'X',
      floors: ["1", "2", "3", "4"],
      position: [1,1]

    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    // Create an instance of RoleRepo
    let elevatorRepoInstance = Container.get(ElevatorRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register ElevatorRepo in the container
    // Create an instance of FloorRepo
    let floorRepoInstance = Container.get(FloorRepo);
    Container.set('FloorRepo', floorRepoInstance); // Register FloorRepo in the container

    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)
    Container.set(config.services.elevator.name, elevatorServiceInstance);

    elevatorServiceInstance = Container.get(config.services.elevator.name);
    sinon.stub(elevatorServiceInstance, "createElevator").
      returns(Result.ok<IElevatorDTO>(
        {
          "id": "123",
          "buildingName": req.body.buildingName,
            "floors": req.body.floors,
            "position": req.body.position
        }
      ));

      const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        "id": "123",
        "buildingName": req.body.buildingName,
        "floors": req.body.floors,
        "position": req.body.position
    }));

  });


  it('updateElevator: returns json with values', async function () {
     let body = {
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    
    let elevatorRepoInstance = Container.get(ElevatorRepo);
    Container.set('ElevatorRepo', elevatorRepoInstance);// Register ElevatorRepo in the container

    let elevatorServiceClass = require(config.services.elevator.path).default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass)

    Container.set(config.services.elevator.name, elevatorServiceInstance);
    elevatorServiceInstance = Container.get(config.services.elevator.name);

    sinon.stub(elevatorServiceInstance, "updateElevator").
      returns(Result.ok<IElevatorDTO>(
        {
            "id": "123",
            "buildingName": req.body.buildingName,
            "floors": req.body.floors,
            "position": req.body.position
        }
      ));

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    await ctrl.updateElevator(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        "id": "123",
        "buildingName": req.body.buildingName,
        "floors": req.body.floors,
        "position": req.body.position
    }));

  }
  );
});