(function () { 
 return angular.module("app.common")
.constant("EnvironmentConfig", {"BaseUrl":"http://api.test.bidir.gebeya.co/","SeasonalMonitoringBaseUrl":"http://seasmon.wenr.wur.nl/cgi-bin/register.py?","SeasmonBaseUrl":"http://seasmon.wenr.wur.nl/html/"})
.constant("app_version", "1.0");

})();
