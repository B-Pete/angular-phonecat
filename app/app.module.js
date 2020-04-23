// Define the `phonecatApp` module
var module = angular.module('phonecatApp', [
  // ...which depends on the `phoneList` module
  'ngResource',
  'ngRoute',
  'phoneList',
  'phoneDetail',
  'core.keycloak'

])

.controller('GlobalCtrl', ($scope, keycloak, Auth) => {
    console.log('Authenticated: ' + Auth.loggedIn);
    $scope.logoutKeycloak = logout;
    $scope.auth = Auth;

    $scope.loginKeycloak = function () {
        keycloak.doLogin()
            .then((authenticated) => {
                $scope.auth.loggedIn = authenticated;
                $scope.auth.authz = keycloakAuth;
            }).catch((e) => {
                console.log("Error thrown in login: " + e)
            });
    };

    $scope.direction = 'login.html';
    function setDirection() {
        $scope.direction = $scope.auth.loggedIn ? '/app.html' : 'login.html';
    }

    $scope.$watch('auth', function () {
        if ($scope.auth.loggedIn === true || $scope.auth.loggedIn === false) {
            setDirection();
        }
    });
})


var auth = {};
var logout = function() {
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz.logout();
    auth.authz = null;
    // window.location = auth.logoutUrl;
};

angular.element(document).ready(function ($http) {
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
        // window.location.reload();
    });
    });

