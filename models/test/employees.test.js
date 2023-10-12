const Employee = require('../employees.model');
 const expect = require('chai').expect;
 const mongoose = require('mongoose');


 describe('Employee', () => {

   it('should throw an error if no arg', () => {


     const dep = new Employee({}); // create new Employee,

     dep.validateSync(err => {
       expect(err.errors.firstName).to.exist;
     });
   });

   it('should throw an error if "firstName" is not a string', () => {

     const cases = [{}, []];
     for (let name of cases) {
       const dep = new Employee({ name });

       dep.validateSync(err => {
         expect(err.errors.firstName).to.exist;
       });
     }
   });
   it('should not throw an error if "firstName", "lastName" and "department" is okay', () => {

     const cases = [
       { firstName: 'John', lastName: 'Doe', department: 'Tech' },
       { firstName: 'Amanda', lastName: 'Watson', department: 'Marketing' },
     ];
     for (let name of cases) {
       const dep = new Employee(name);

       dep.validateSync(err => {
         expect(err).to.not.exist;
       });
     }
   });

 });