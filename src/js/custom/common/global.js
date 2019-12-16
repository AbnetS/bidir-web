var API = {
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
            Dashboard: 'dashboard',
            AllReport: 'all'
        },
        Group:{
            Group: '',
            Printout:'printout'
        }
    }
};

var MONTHS_CONST = [
    {
        "name": "January",
        "short": "Jan",
        "number": 1,
        "days": 31
    },
    {
        "name": "February",
        "short": "Feb",
        "number": 2,
        "days": 28
    },
    {
        "name": "March",
        "short": "Mar",
        "number": 3,
        "days": 31
    },
    {
        "name": "April",
        "short": "Apr",
        "number": 4,
        "days": 30
    },
    {
        "name": "May",
        "short": "May",
        "number": 5,
        "days": 31
    },
    {
        "name": "June",
        "short": "Jun",
        "number": 6,
        "days": 30
    },
    {
        "name": "July",
        "short": "Jul",
        "number": 7,
        "days": 31
    },
    {
        "name": "August",
        "short": "Aug",
        "number": 8,
        "days": 31
    },
    {
        "name": "September",
        "short": "Sep",
        "number": 9,
        "days": 30
    },
    {
        "name": "October",
        "short": "Oct",
        "number": 10,
        "days": 31
    },
    {
        "name": "November",
        "short": "Nov",
        "number": 11,
        "days": 30
    },
    {
        "name": "December",
        "short": "Dec",
        "number": 12,
        "days": 31
    }
];

var QUESTION_TYPE = {
    FILL_IN_BLANK: "FILL_IN_BLANK",
    YES_NO: "YES_NO",
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
    SINGLE_CHOICE: "SINGLE_CHOICE",
    GROUPED: "GROUPED"
};
var ACAT_GROUP_CONSTANT = {
    SEED: "SEED",
    FERTILIZER: "FERTILIZER",
    CHEMICALS: "CHEMICALS",
    LABOUR_COST:"LABOUR_COST",
    OTHER_COST:"OTHER_COST"
};
var ACAT_COST_LIST_TYPE = {
    LINEAR: "linear",
    GROUPED: "grouped"
};

var SCREENING_STATUS = {
    IN_PROGRESS:{code:'screening_inprogress',name:'In Progress'},
    SUBMITTED:{code:'submitted',name:'Submitted'},
    APPROVED:{code:'approved',name:'Approved'},
    DECLINED_FINAL:{code:'declined_final',name:'Declined Final'},
    DECLINED_UNDER_REVIEW:{code:'declined_under_review',name:'Declined Under Review'}
};

var MD_TABLE_GLOBAL_SETTINGS = {
    PAGE_SIZES : [10, 25, 50, 100, 250, 500],
    OPTIONS:  {
        rowSelection: false,
        multiSelect: false,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: false
    }
};
var CIVIL_STATUSES  = ["single","married","widowed","other"];

var INDICATOR = {
    VI: 'VI',
    RAINFALL: 'PRECIP'
};