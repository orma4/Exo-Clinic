import InsertField from '../components/GeneralComponents/InsertField';


//Initial Data
const  initialState = {
    dashBoardTable: {
        columns: [
            { accessor: 'patientFirstName',   label: 'Patient Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: false, CustomComponent: InsertField },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,sortable: false, CustomComponent: InsertField },
            { accessor: 'phone',  label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
            { accessor: 'date',   label: 'Date', priorityLevel: 4, position: 4, minWidth: 150, sortType: 'date',sortable: false},
            { accessor: 'time',   label: 'Time', priorityLevel: 5, position: 5, minWidth: 150, sortable: false },
            { accessor: 'image',  label: 'Photo', priorityLevel: 6, position: 6, minWidth: 200, CustomComponent: InsertField, sortable: false },
            { accessor: 'action', label: 'Actions', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }

        ],
        rows: [],
        defaultSortColumn: 'date',
    } ,

    appointmentsTable: {
        columns: [
            { accessor: 'patientFirstName',   label: 'Patient Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: false, CustomComponent: InsertField },
            { accessor: 'time',   label: 'Time', priorityLevel: 2, position:2, minWidth: 150, sortable: false },
            { accessor: 'join',  label: '', priorityLevel: 3, position: 3, minWidth: 200, CustomComponent: InsertField, sortable: false }
        ],
        rows: [],
        defaultSortColumn: 'date',
    },

    
    appointmentsHistoryTable: {
        columns: [
            { accessor: 'patientFirstName',   label: 'Patient Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: false, CustomComponent: InsertField },
            { accessor: 'date',   label: 'Date', priorityLevel: 3, position: 3, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'time',   label: 'Time', priorityLevel: 2, position: 2, minWidth: 150, sortable: false },
            { accessor: 'report',  label: '', priorityLevel: 4, position: 4, minWidth: 200, CustomComponent: InsertField, sortable: false }       
        ],
        rows: [],
        defaultSortColumn: 'date',
    },
    reportsTable: {
        columns: [
            { accessor: 'doctorFirstName',   label: 'Doctor Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: false, CustomComponent: InsertField  },
            { accessor: 'date',   label: 'Date', priorityLevel: 2, position: 2, minWidth: 150, sortType: 'date',sortable: false },
            { accessor: 'time',   label: 'Time', priorityLevel: 1, position: 1, minWidth: 150, sortable: false },
            { accessor: 'report',   label: 'View Report', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField },
        ],
        rows: [],
        defaultSortColumn: 'date',
    },
    videoReportsTable: {
        columns: [
            { accessor: 'date',   label: 'Date', priorityLevel: 2, position: 2, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'report',   label: 'View Report', priorityLevel: 3, position: 3, minWidth: 150, CustomComponent: InsertField },
        ],
        rows: [],
        defaultSortColumn: 'date',
    },
    patientsTable: {
        columns: [
            { accessor: 'patientFirstName',   label: 'Patient Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: false, CustomComponent: InsertField },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
            { accessor: 'phone',   label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
            { accessor: 'viewProfile',  label: '', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false },
            { accessor: 'upload',   label: 'upload', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField}
],
        rows: [],
        defaultSortColumn: 'date',
    } 
}

const TableReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default TableReducer;
