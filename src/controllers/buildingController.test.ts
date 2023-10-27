import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IBuildingService from '../services/IServices/IBuildingService';
import BuildingController from "./buildingController";
import IBuildingDTO from '../dto/IBuildingDTO';
import BuildingRepo from '../repos/buildingRepo';
import FloorRepo from '../repos/floorRepo';
import url from 'url';

describe('building controller', function () {

  beforeEach(function () { });

  it('createBuilding: returns json with values', async function () {
    let body = {
      id: '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
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

    let buildingServiceClass = require(config.services.building.path).default;
    let buildingServiceInstance = Container.get(buildingServiceClass)
    Container.set(config.services.building.name, buildingServiceInstance);

    buildingServiceInstance = Container.get(config.services.building.name);
    sinon.stub(buildingServiceInstance, "createBuilding").
      returns(Result.ok<IBuildingDTO>(
        {
          "id": "123",
          "name": req.body.name,
          "description": req.body.description,
          "depth": req.body.depth,
          "width": req.body.width
        }
      ));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "description": req.body.description,
      "depth": req.body.depth,
      "width": req.body.width
    }));

  });


  it('updateBuilding: returns json with values', async function () {
     let body = {
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };

    
    let buildingRepoInstance = Container.get(BuildingRepo);
    Container.set('BuildingRepo', buildingRepoInstance);// Register BuildingRepo in the container

    let buildingServiceClass = require(config.services.building.path).default;
    let buildingServiceInstance = Container.get(buildingServiceClass)

    Container.set(config.services.building.name, buildingServiceInstance);
    buildingServiceInstance = Container.get(config.services.building.name);

    sinon.stub(buildingServiceInstance, "updateBuilding").
      returns(Result.ok<IBuildingDTO>(
        {
          "id": "123",
          "name": req.body.name,
          "description": req.body.description,
          "depth": req.body.depth,
          "width": req.body.width
        }
      ));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "description": req.body.description,
      "depth": req.body.depth,
      "width": req.body.width
    }));

  }
  );





  it('getallBuildings: returns json with values', async function () {
    let body = {
      id: '123',
      name: 'X',
      description: 'Edificio de LEI',
      depth: 10,
      width: 10
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

    let buildingServiceClass = require(config.services.building.path).default;
    let buildingServiceInstance = Container.get(buildingServiceClass)
    Container.set(config.services.building.name, buildingServiceInstance);

    buildingServiceInstance = Container.get(config.services.building.name);
    sinon.stub(buildingServiceInstance, "getallBuildings").
      returns(Result.ok<IBuildingDTO[]>(
        [
          {
            "id": "123",
            "name": req.body.name,
            "description": req.body.description,
            "depth": req.body.depth,
            "width": req.body.width
          }
        ]
      ));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    await ctrl.getallBuildings(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([
      {
        "id": "123",
        "name": req.body.name,
        "description": req.body.description,
        "depth": req.body.depth,
        "width": req.body.width
      }
    ]));
    

  });

  it('getBuildingsWithMinMaxFloors: returns json with values in URL', async function () {
    let queryParams = {
      minFloors: 1,
      maxFloors: 10 
    };
    let req: Partial<Request> = {
      url: url.format({
        pathname: '/:minFloors/:maxFloors',
        query: queryParams
      })
    };
  
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => { };
  
    // Create an instance of BuildingRepo
    let buildingRepoInstance = Container.get(BuildingRepo);
    Container.set('buildingRepo', buildingRepoInstance);// Register BuildingRepo in the container

    let buildingServiceClass = require(config.services.elevator.path).default;
    let buildingServiceInstance = Container.get(buildingServiceClass)

    Container.set(config.services.building.name, buildingServiceClass);

    buildingServiceClass = Container.get(config.services.building.name);

    sinon.stub(buildingServiceInstance, "getBuildingsWithMinMaxFloors").
      returns(Result.ok<IBuildingDTO[]>(
        [
          {
            id: '123',
            name: 'X',
            description: 'Edificio de LEI',
            depth: 10,
            width: 10
          }
        ]
      ));

      const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);
  
    await ctrl.getBuildingsWithMinMaxFloors(<Request>req, <Response>res, <NextFunction>next);
  
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match([
      {
        id: '123',
        name: 'X',
        description: 'Edificio de LEI',
        depth: 10,
        width: 10
      }
    ]));
  });


  
});