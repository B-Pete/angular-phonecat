angular.module('core.keycloak', [])
.factory('keycloak', (Auth) => {
    var keycloakAuth = Auth.authz;
    var self = this;
    var auth = {};

    self.kc = function() {
        return keycloakAuth;
    };

    self.checkLogin = function() {
        return keycloakAuth.init({onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/app.html'});
    };

    self.doLogin = function() {
        return keycloakAuth.init({ onLoad: 'login-required'});
    };

    return self;
});
