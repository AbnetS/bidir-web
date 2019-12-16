/**
 * Created by Yoni on 1/29/2018.
 */
(function() {
    "use strict";

    angular.module("app.forms", [
    ]).run(runBlock).config(config);

    function runBlock() {}
    function config($mdIconProvider) {
        $mdIconProvider.iconSet("avatars", 'app/img/icons/avatar-icons.svg',128);
    }

})();