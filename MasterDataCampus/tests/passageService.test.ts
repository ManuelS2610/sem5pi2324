import * as sinon from 'sinon';
import { Container } from 'typedi';
import PassageRepo  from '../src/repos/passageRepo';
import { Result } from '../src/core/logic/Result'
import { Passage } from '../src/domain/passage'
import { IPassageDTO } from '../src/dto/IPassageDTO'
import BuildingRepo from '../src/repos/buildingRepo';
import FloorRepo from '../src/repos/floorRepo';
import { ObjectId } from 'mongodb';
import { UniqueEntityID } from '../src/core/domain/UniqueEntityID';
import passageService from '../src/services/passageService';
describe('PassageService', () => {
    describe('createPassage', () => {
        it('should create a passage', async () => {
            let passageDTO = {
                building1: 'X',
                building2: 'X',
                pisobuilding1: 'X1',
                pisobuilding2: 'X1',
                positionBuilding1: [],
                positionBuilding2: []
            };
        
            let passage = {
                id: '123',
                building1: 'X',
                building2: 'X',
                pisobuilding1: 'X1',
                pisobuilding2: 'X1',
                positionBuilding1: [],
                positionBuilding2: []
            };
        
            let passageRepoInstance = Container.get(PassageRepo);
            Container.set('PassageRepo', passageRepoInstance);
            let buildingRepoInstance = Container.get(BuildingRepo);
            Container.set('BuildingRepo', buildingRepoInstance);
            let floorRepoInstance = Container.get(FloorRepo);
            Container.set('FloorRepo', floorRepoInstance);
        
            // Use 'resolves' to return resolved Promises with expected values
            sinon.stub(buildingRepoInstance, 'findByName').resolves({ name: 'X' });
            sinon.stub(floorRepoInstance, 'findByName').resolves({ name: 'X1', buildingName: 'X' });
            sinon.stub(passageRepoInstance, 'findByPisos').resolves(null);
            sinon.stub(passageRepoInstance, 'findByPisosReverse').resolves(null);
        
            // Use 'resolves' to return a resolved Promise with the expected value
            sinon.stub(passageRepoInstance, 'save').resolves(Result.ok<Passage>(Passage.create(passage, new UniqueEntityID('128977')).getValue()));
            
            const srv = new passageService(passageRepoInstance, buildingRepoInstance, floorRepoInstance);
        
            await srv.createPassage(passage);
        
            sinon.assert.calledOnce(passageRepoInstance.save);
        
            sinon.assert.calledWith(passageRepoInstance.save, sinon.match({
                id: '123',
                building1: 'X',
                building2: 'X',
                pisobuilding1: 'X1',
                pisobuilding2: 'X1',
                positionBuilding1: [],
                positionBuilding2: []
            }));
        });
    describe('updatePassage', () => { });
    describe('getPassagesBetween2Buildings', () => { });
    describe('updatePassagePosition', () => { });

});
});