// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneListModule', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'phone-list-module/phoneList.template.html',
    //*** controller: PhoneListController
    // controller: ['$http', PhoneListController]
    controller: ['Phone', PhoneListController]
  });

  //*** */ PhoneListController.$inject = ['$http'];
  // function PhoneListController($http) {
  //   var self = this;
  //   self.orderProp = 'age';

  //   $http.get('phones/phones.json').then(function(response) {
  //     self.phones = response.data;
  //     self.phones = response.data.slice(0, 5);
  //   });
  // }

  function PhoneListController(Phone) {
    this.phones = Phone.query();
    this.orderProp = 'age';
  }