(function(angular) {
  "use strict";

  angular
    .module("app.common", [])
      .config(routeConfig)
      .run(runBlock);

  function runBlock() {}
  function routeConfig() {}

})(window.angular);
