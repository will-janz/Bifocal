'use strict';

angular.module('OBB.services', []).
    service('Site', function() {
        // Site service to more easily control visual aspects and shared data
        // Consider it a non-global but kinda sorta not really global variable

        this.vertical = 'main';
        this.page =     'home';
        this.title =    'Home';
        this.hideSearch = true;
        this.joinUrl = 'join';

        // configuration by its nature is based of one key with one value.
        // change the value per configuration.
        // TODO: Load the config from a json file.
        this.cfg = {
            //apiHost: "http://[REDACTED]/"  // Remote production
            // apiHost: "http://localhost:8080/"        // Local dev
            apiHost: "http://[REDACTED]/"     // Remote staging
        };

        this.user = {
            /* This object will hold all information related to user
             * authentication. Currently only holds values.
             * Later on, this might hold authentication functions; at that point
             * it should probably become its own service
             */
            isLoggedIn: false,
            credentials: "", // Some base64 thing for the API
            links: {
                self: null,
                search: this.cfg.apiHost + 'companies?search'
            }
        };
  });
