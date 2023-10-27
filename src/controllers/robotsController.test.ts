import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IRobotService from '../services/IServices/IRobotService';
import RobotController from "./robotController";
import IRobotDTO from '../dto/IRobotDTO';
import RobotRepo from '../repos/robotRepo';
import RobotTypeRepo from '../repos/robotTypeRepo';


describe('robot controller', function () {

  beforeEach(function () { });

  it('createRobot: returns json with values', async function () {
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

  
    let robotRepoInstance = Container.get(RobotRepo);
    Container.set('RobotRepo', robotRepoInstance);// Register RobotRepo in the container

    let robotTypeRepoInstance = Container.get(RobotTypeRepo);
    Container.set('RobotTypeRepo', robotTypeRepoInstance);// Register RobotTypeRepo in the container

    let robotServiceClass = require(config.services.robot.path).default;
    let robotServiceInstance = Container.get(robotServiceClass)
    Container.set(config.services.robot.name, robotServiceInstance);

    robotServiceInstance = Container.get(config.services.robot.name);
    sinon.stub(robotServiceInstance, "createRobot").
      returns(Result.ok<IRobotDTO>(
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

    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

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

  it('getallRobots: returns json with values', async function () {
    let body = {
      id: '123',
      type: 'Survaillance',
      designation: 'Edificio de LEI',
      serialNumber: "10f34ds2d",
      description: "dsada",
      available: true
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    // Create an instance of RobotRepo
    let robotRepoInstance = Container.get(RobotRepo);
    Container.set('RobotRepo', robotRepoInstance);// Register RobotRepo in the container

    // Create an instance of RobotTypeRepo
    let robotTypeRepoInstance = Container.get(RobotTypeRepo);
    Container.set('RobotTypeRepo', robotTypeRepoInstance);// Register RobotTypeRepo in the container

    let robotServiceClass = require(config.services.robot.path).default;
    let robotServiceInstance = Container.get(robotServiceClass)

    Container.set(config.services.robot.name, robotServiceInstance);

    robotServiceInstance = Container.get(config.services.robot.name);

    sinon.stub(robotServiceInstance, "getallRobots").
      returns(Result.ok<IRobotDTO[]>(
        [
          {
            "id": "123",
            "type": req.body.type,
            "designation": req.body.designation,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "available": req.body.available,
          }
        ]
      ));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    await ctrl.getallRobots(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([
      {
        "id": "123",
        "type": req.body.type,
        "designation": req.body.designation,
        "serialNumber": req.body.serialNumber,
        "description": req.body.description,
        "available": req.body.available,
      }
    ]));
  });




});
