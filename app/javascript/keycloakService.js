angular.module('core.keycloak', [])
.factory('keycloakService', (Auth) => {
    var self = this;

    self.doLogin = function() {
        return Auth.authz.init({ onLoad: 'login-required'
        }).then((authenticated) => {
            Auth.loggedIn = authenticated;
        }).catch((e) => {
            Auth.loggedIn = false;
            console.log("Error thrown in doLogin: " + e);
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
