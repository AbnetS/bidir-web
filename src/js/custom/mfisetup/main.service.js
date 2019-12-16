(function(angular) {
  'use strict';
  angular.module('app.mfi')

  .service('MainService', MainService);

  MainService.$inject = ['$http','CommonService','AuthService'];

  function MainService($http, CommonService,AuthService) {

      return {
        GetMFI: _getMFI,
        UpdateMFI: _updateMFI,
        CreateMFI:_createMFI,
        UpdateBranch: _updateBranch,
        GetBranches: _getBranches,
        CreateBranch:_createBranch
      };

      function _getBranches(){
          return $http.get(CommonService.buildPaginatedUrl(API.Service.MFI,API.Methods.MFI.Branches));
      }
      function _createBranch(branch){
        return $http.post(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.CreateBranch), branch);
      }
      function _updateBranch(updated_branch){
          return $http.put(CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.Branches,updated_branch._id), updated_branch);
      }

      function _getMFI(){
        return $http.get(CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.GetAll));
      }
      function _updateMFI(data,logo){
        var updatedMFI = setAttribute(data,logo);

        return $http({
          url: CommonService.buildUrlWithParam(API.Service.MFI,API.Methods.MFI.MFIUpdate,data._id),
          method: 'PUT',
          data: updatedMFI,
          //assigning content-type as undefined,let the browser
          //assign the correct boundary for us
          headers: {
                  'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity
      });
      }

      function _createMFI(data,logo){
        var mfiData = setAttribute(data,logo);
        return $http({
          url: CommonService.buildUrl(API.Service.MFI,API.Methods.MFI.MFI),
          method: 'POST',
          data: mfiData,
          //assigning content-type as undefined,let the browser handle it
          headers: {
            'Authorization': 'Bearer ' + AuthService.GetToken(),
            'Content-Type': undefined},
          //prevents serializing data.  don't do it.
          transformRequest: angular.identity
      });

      }

      function setAttribute(mfi,picFile){
          var mfiData = new FormData();
          mfiData.append("name", mfi.name);
          mfiData.append("location", mfi.location);
          mfiData.append("establishment_year", mfi.establishment_year);
          mfiData.append("contact_person", _.isUndefined(mfi.contact_person)?'':mfi.contact_person);
          mfiData.append("phone", _.isUndefined(mfi.phone)?'':mfi.phone);
          mfiData.append("email", _.isUndefined(mfi.email)?'':mfi.email);
          mfiData.append("website_link", _.isUndefined(mfi.website_link)?'':mfi.website_link);
          if(!_.isUndefined(picFile)){
              mfiData.append("logo", picFile);
          }

          return mfiData;
      }
  }

})(window.angular);
