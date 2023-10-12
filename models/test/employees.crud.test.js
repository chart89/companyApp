const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
          await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
      });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'Employee fN #1', lastName: 'Employee lN #1', department: 'Employee dep #1' });
            await testEmpOne.save();
      
            const testEmpTwo = new Employee({ firstName: 'Employee fN #2', lastName: 'Employee lN #2', department: 'Employee dep #2' });
            await testEmpTwo.save();
          });

        it('should return all the data with find method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
        it('should return proper document by various params with findOne method', async () => {
            const employees = await Employee.findOne({ firstName: 'Employee fN #1' });
            const expectedName = 'Employee fN #1';
            expect(employees.firstName).to.be.equal('Employee fN #1');
        });
        after(async () => {
			await Employee.deleteMany();
		});
    });  
    describe('Creating data', () => {
        it('should insert new document with insertOne method', async () => {
            const employees = new Employee({ firstName: 'Employee fN #1', lastName: 'Employee lN #1', department: 'Employee dep #1' });
            await employees.save();
            expect(employees.isNew).to.be.false;
        });
        after(async () => {
			await Employee.deleteMany();
		});
    });
    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'Employee fN #1', lastName: 'Employee lN #1', department: 'Employee dep #1' });
            await testEmpOne.save();
          
            const testEmpTwo = new Employee({ firstName: 'Employee fN #2', lastName: 'Employee lN #2', department: 'Employee dep #2' });
            await testEmpTwo.save();
          });
      
          afterEach(async () => {
            await Employee.deleteMany();
          });
        it('should properly update one document with updateOne method', async () => {
            await Employee.updateOne({ firstName: 'Employee fN #1' }, { $set: { firstName: '=Employee fN #1=' }});
            const updatedEmployee = await Employee.findOne({ firstName: '=Employee fN #1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update one document with save method', async () => {
            const employees = await Employee.findOne({ firstName: 'Employee fN #1' });
            employees.firstName = '=Employee fN #1=';
            await employees.save();
            const updatedEmployee = await Employee.findOne({ firstName: '=Employee fN #1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update multiple documents with updateMany method', async () => {
            await Employee.updateMany({}, { $set: { lastName: 'Updated!'}});
            const employees = await Employee.find();
            expect(employees[0].lastName).to.be.equal('Updated!');
            expect(employees[1].lastName).to.be.equal('Updated!');
        });
    });
    describe('Removing data', () => {
        beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'Employee fN #1', lastName: 'Employee lN #1', department: 'Employee dep #1' });
          await testEmpOne.save();
      
          const testEmpTwo = new Employee({ firstName: 'Employee fN #2', lastName: 'Employee lN #2', department: 'Employee dep #2' });
          await testEmpTwo.save();
        });
      
        afterEach(async () => {
          await Employee.deleteMany();
        });
        it('should properly remove one document with deleteOne method', async () => {
          await Employee.deleteOne( { firstName: 'Employee fN #1' });
          const employees = await Employee.findOne( { firstName: 'Employee fN #1' } );
          expect(employees).to.be.null;
        });
        it('should properly remove multiple documents with deleteMany method', async () => {
           await Employee.deleteMany();
           const employees = await Employee.find();
           expect(employees.length).to.be.equal(0);
        });
    });

});