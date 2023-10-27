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
    // Define os parâmetros minFloors e maxFloors
    const minFloors = '1';
    const maxFloors = '10';

    // Crie um objeto req simulado com os parâmetros na URL
    let req: Partial<Request> = {
      params: { minFloors, maxFloors }
    };

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    let next: Partial<NextFunction> = () => {};

    // Crie um stub para buildingServiceInstance.getBuildingsWithMinMaxFloors
    const buildingServiceInstance = {
      getBuildingsWithMinMaxFloors: sinon.stub()
    };

    // Configure o stub para retornar um resultado válido
    buildingServiceInstance.getBuildingsWithMinMaxFloors.returns(
      Result.ok<IBuildingDTO[]>([
        {
          id: '123',
          name: 'X',
          description: 'Edificio de LEI',
          depth: 10,
          width: 10
        }
      ])
    );

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    // Chame a função a ser testada
    await ctrl.getBuildingsWithMinMaxFloors(req as Request, res as Response, next as NextFunction);

    // Verifique se a função json do res foi chamada com os valores corretos
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