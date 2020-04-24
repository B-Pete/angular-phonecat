// Define the `phonecatApp` module
var module = angular.module('phonecatApp', [
  // ...which depends on the `phoneList` module
  'ngResource',
  'ngRoute',
  'phoneList',
  'phoneDetail',
  'core.keycloak'

])

.controller('GlobalCtrl', ($scope, Auth, keycloakService) => {
    $scope.auth = Auth;
    console.log('Authenticated: ' + $scope.auth.loggedIn);
    
    $scope.logoutKeycloak = function () {
        keycloakService.doLogout();
    };

    $scope.loginKeycloak = function() {
        keycloakService.doLogin();
    };

    $scope.direction = './login.html';
    function setDirection() {
        $scope.direction = $scope.auth.loggedIn ? './app.html' : './login.html';
    };

    $scope.$watch('auth', function () {
        if ($scope.auth.loggedIn === true || $scope.auth.loggedIn === false) {
            setDirection();
        }
    });
})

