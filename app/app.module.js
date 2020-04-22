// Define the `phonecatApp` module
angular.module('phonecatApp', [
  // ...which depends on the `phoneList` module
  'ngResource',
  'ngRoute',
  'phoneList',
  'phoneDetail'
]);