// Define the `phonecatApp` module
var module = angular.module('phonecatApp', [
  // ...which depends on the `phoneList` module
  'ngResource',
  'ngRoute',
  'phoneList',
  'phoneDetail',
  'core.keycloak'

])

.controller('GlobalCtrl', ($scope, keycloakService) => {
    $scope.auth = keycloakService.auth;
    console.log('Authenticated: ' + $scope.auth.loggedIn);

    $scope.logoutKeycloak = function () {
        keycloakService.doLogout();
    };

    $scope.loginKeycloak = function() {
        keycloakService.doLogin();
    };

    $scope.direction = 'login.html';
    function setDirection() {
        $scope.direction = $scope.auth.loggedIn ? '/app.html' : 'login.html';
    };

    $scope.$watch('auth', function () {
        if ($scope.auth.loggedIn === true || $scope.auth.loggedIn === false) {
            setDirection();
        }
    });
})

angular.element(document).ready(function ($http) {
    var auth = {};
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({onLoad: 'check-sso'}).then((authenticated) => {
        auth.loggedIn = authenticated;
        auth.authz = keycloakAuth;
        module.factory('Auth', function() {
            return auth;
        });
      angular.bootstrap(document, ["phonecatApp"]);
    }).catch((e) => {
        console.log("Error thrown in init: " + e)
        window.location.reload();
    });
});

