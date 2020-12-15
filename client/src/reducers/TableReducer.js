import InsertField from '../components/DoctorComponent/Dashboard/InsertField';
// import ExchangeLink from '../components/DoctorComponent/Dashboard/ExchangeLink';


//Initial Data
const  initialState = {
    dashBoardTable: {
        columns: [
            { accessor: 'name',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
        //    { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
            { accessor: 'phone',   label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
        //   //  { accessor: 'amountSpent', label: 'Total Spent', priorityLevel: 4, position: 4, minWidth: 150, CustomComponent: ExchangeLink },
        //   //  { accessor: 'chargeTo', label: 'Charged To', priorityLevel: 7, position: 5, minWidth: 150, },
            { accessor: 'date',   label: 'Date', priorityLevel: 4, position: 4, minWidth: 150, sortType: 'date', sortable: false },
            { accessor: 'time',   label: 'Time', priorityLevel: 5, position: 5, minWidth: 150, sortable: false },
        //     // { accessor: 'reason', label: 'Reason for Appointment', priorityLevel: 6, position: 6, minWidth: 300, sortable: false, },
        //     // { accessor: 'status', label: 'Status', priorityLevel: 7, position: 7, minWidth: 300, sortable: false, },
            { accessor: 'image',  label: 'Photo', priorityLevel: 6, position: 6, minWidth: 200, CustomComponent: InsertField, sortable: false },
            { accessor: 'action',  label: 'Action', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }

        ],
        rows: [],
        defaultSortColumn: 'date',
    } ,

    appointmentsTable: {
        columns: [
            { accessor: 'name',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
        //    { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
          //  { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
        //    { accessor: 'phone',   label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
        //   //  { accessor: 'amountSpent', label: 'Total Spent', priorityLevel: 4, position: 4, minWidth: 150, CustomComponent: ExchangeLink },
        //   //  { accessor: 'chargeTo', label: 'Charged To', priorityLevel: 7, position: 5, minWidth: 150, },
            { accessor: 'time',   label: 'Time', priorityLevel: 5, position: 5, minWidth: 150, sortable: false },
        //     // { accessor: 'reason', label: 'Reason for Appointment', priorityLevel: 6, position: 6, minWidth: 300, sortable: false, },
        //     // { accessor: 'status', label: 'Status', priorityLevel: 7, position: 7, minWidth: 300, sortable: false, },
            { accessor: 'join',  label: '', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }

        ],
        rows: [],
        defaultSortColumn: 'date',
    },

    patientsTable: {
        columns: [
            { accessor: 'name',   label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, CustomComponent: InsertField },
        //    { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
            { accessor: 'email',  label: 'Email', priorityLevel: 2, position: 2, minWidth: 150 ,CustomComponent: InsertField },
            { accessor: 'phone',   label: 'Phone', priorityLevel: 3, position: 3, minWidth: 150, sortable: false, CustomComponent: InsertField},
        //   //  { accessor: 'amountSpent', label: 'Total Spent', priorityLevel: 4, position: 4, minWidth: 150, CustomComponent: ExchangeLink },
        //   //  { accessor: 'chargeTo', label: 'Charged To', priorityLevel: 7, position: 5, minWidth: 150, },
        //     { accessor: 'date',   label: 'Date', priorityLevel: 4, position: 4, minWidth: 150, sortType: 'date', sortable: false },
        //     { accessor: 'time',   label: 'Time', priorityLevel: 5, position: 5, minWidth: 150, sortable: false },
        // //     // { accessor: 'reason', label: 'Reason for Appointment', priorityLevel: 6, position: 6, minWidth: 300, sortable: false, },
        // //     // { accessor: 'status', label: 'Status', priorityLevel: 7, position: 7, minWidth: 300, sortable: false, },
        //     { accessor: 'image',  label: 'Photo', priorityLevel: 6, position: 6, minWidth: 200, CustomComponent: InsertField, sortable: false },
        //     { accessor: 'action',  label: 'Action', priorityLevel: 7, position: 7, minWidth: 200, CustomComponent: InsertField, sortable: false }

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
