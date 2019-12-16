(function (angular) {
    "use strict";

    angular
        .module('app.common')
        .constant("_", window._)
        .constant("APP_CONSTANTS", {
            USER_ROLES: {
                ALL: "*",
                ADMIN: "admin"
            },
            StorageKey: {
                TOKEN: "token",
                SESSION: "SESSION",
                PERMISSIONS: "PERMISSIONS",
                ACCESS_BRANCHES: "ACCESS_BRANCHES"
            },
            AUTH_EVENTS: {
                loginSuccess: "auth-login-success",
                loginFailed: "auth-login-failed",
                logoutSuccess: "auth-logout-success",
                logoutUser: "auth-logout-user",
                sessionTimeout: "auth-session-timeout",
                notAuthenticated: "auth-not-authenticated",
                notAuthorized: "auth-not-authorized"
            },
            REDIRECT_TO_URL: "redirectToUrlAfterLogin",
            FILE_TYPE: {
                PDF: {type: 'application/pdf'},
                DOC: {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
                EXCEL: {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
            }
        })
        .constant('API_DEFINITION',{
        Service: {
            NONE:'',
            MFI: 'MFI',
            Auth: 'auth',
            Users: 'users',
            SCREENING:'screenings',
            LOANS:'loans',
            FORM:'forms',
            ACAT:'acat',
            GEOSPATIAL: 'geospatial',
            REPORT:'reports',
            GROUPS: 'groups',
            FETCH: 'fetch'
        },
        Methods: {
            Auth: {
                Login: 'login'
            },
            MFI: {
                MFIUpdate:'',
                MFI:'create',
                GetAll:'all',
                Branches: 'branches',
                CreateBranch: 'branches/create',
                FetchBranches: 'branches',
                Zones: 'zones'
            },
            Users: {
                Account:'accounts',
                UserUpdate:'',
                User:'create',
                GetAll: '',
                Roles: 'roles',
                Role: 'roles/create'
            },
            Roles:{
                GetAll: 'roles',
                Create: 'roles/create',
                Permissions: 'permissions',
                PermissionByGroup: 'permissions/groups'
            },
            Tasks: {
                Task:'tasks',
                GetAll: 'tasks/paginate?page=1&per_page=100'
            },
            Clients:{
                All:'clients/paginate?source=web',
                Client:'clients',
                SearchClient:''
            },
            Form:{
                All: '',
                Create: 'create',
                Question:'questions',
                Create_Question:'questions/create',
                Section:'sections',
                Create_Section:'sections/create'
            },
            ACAT:{
                Empty: '',
                ACAT:'forms',
                Crop:'crops',
                Clients:'clients',
                CreateCrop:'crops/create',
                LoanProducts:'loanProducts',
                CreateLoanProducts:'loanProducts/create',
                CostListUpdate: 'costLists',
                CostListGroups: 'costLists/groups',
                CostList: 'costLists/add',
                CreateACAT:'forms/initialize',
                LoanProposals:'loanProposals/acat',
                Printout:'printout'
            },
            SCREENING:{
                Screening:'',
                Clients:'clients',
                Histories: 'histories/search?'
            },
            LOANS:{
                Loans:'',
                Clients:'clients'
            },
            CBS:{
                Clients: 'clients/search?cbs_status=NO ATTEMPT&&cbs_status=DENIED&loan_cycle_number=1&status=loan_granted',
                CBS:    'clients/cbs',
                CBSBulk:'clients/cbs/bulk',
                Connect: 'cbs/connect'
            },
            GeoSpatial:{
                SaveConfig: 'configs/create',
                Config: 'configs',
                UserConfig: 'configs/search?user=',
                Woredas: 'weredas',
                Request: 'requests/create',
                Search: 'requests/search?'
            },
            Report:{
                Report: '',
                AllReport: 'all'
            },
            Group:{
                Group: '',
                Printout:'printout'
            }
        }
    });
})(window.angular);
