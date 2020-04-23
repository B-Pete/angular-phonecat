angular
  .module('phoneDetail')
    .component('phoneDetail', {
        templateUrl: 'phoneDetail/phoneDetail.template.html',
        controller: ['$http', '$routeParams', PhoneDetailController]
        // controller: ['Phone', '$routeParams', PhoneDetailController]
    });

// function PhoneDetailController(Phone, $routeParams) {
  function PhoneDetailController($http, $routeParams) {
    var self = this;
    self.setImage = function setImage(imageUrl) {
      self.mainImageUrl = imageUrl;
    };
    $http.get('phones/' + $routeParams.phoneId + '.json').then(function (response) {
      self.phone = response.data;
      self.setImage(self.phone.images[0]);
    });
    // self.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    //     self.setImage(phone.images[0]);
    // });
  }
  
