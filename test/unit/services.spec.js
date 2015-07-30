'use strict';

// Shared vertical services spec

describe('Shared services', function() {
    var site;

    beforeEach(module('OBB.services'));

    beforeEach(inject(function(Site){
        site = Site;
    }));
    describe('Site', function(){
        it('should have the appropriate defaults', function(){
            expect(site.vertical).toBe('main');
            expect(site.page).toBe('home');
            expect(site.title).toBe('Home');
            expect(site.hideSearch).toBe(true);
            expect(site.joinUrl).toBe('join');
            expect(site.user.isLoggedIn).toBe(false);
            expect(site.user.credentials).toBe('');
            expect(site.user.links.self).toBe(null);
            expect(site.user.links.search).toBe(site.cfg.apiHost + 'companies?search');
        });
    });
});
