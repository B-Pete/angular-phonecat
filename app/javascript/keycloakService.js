angular.module('core.keycloak', [])
.factory('keycloakService', (Auth) => {
    var self = this;
    self.auth = Auth;

    var authenticator = Auth.authz;
    self.doLogin = function() {
        return authenticator.init({ onLoad: 'login-required'
        }).then((authenticated) => {
            Auth.loggedIn = authenticated;
        }).catch((e) => {
            console.log("Error thrown in login: " + e);
        });
    };


    self.doLogout = function () {
        console.log('*** LOGOUT');
        Auth.loggedIn = false;
        Auth.authz.logout();
        Auth.authz = null;
    };

    return self;
});
