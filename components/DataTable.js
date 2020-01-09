import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { object } from 'prop-types';
import { Container, TextField, Button, Box, Select, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const headLookup = {
    0: 'Test 1',
    1: 'Test 2',
    2: 'Test 3',
    3: 'Test 4'
};

const subLookup = {
    0: { 0: 'Dependent list 0', 1: 'Dependent list 1', 2: 'Dependent list 2' },
    1: { 0: 'Dependent list 3', 1: 'Dependent list 4', 2: 'Dependent list 5' },
    2: { 0: 'Dependent list 6', 1: 'Dependent list 7', 2: 'Dependent list 8' },
    3: { 0: 'Dependent list 9', 1: 'Dependent list 10', 2: 'Dependent list 11' },
};

const testData = [
    { name: 'Mehmet', surname: 'Baran', headLookup: 0, subLookup: 2 },
    {
        name: 'Zerya Betül',
        surname: 'Baran',
        headLookup: 1,
        subLookup: 1,
    },
]
const DataTable = () => {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            {
                title: 'Head', field: 'headLookup', lookup: headLookup, editComponent: props => (
                    <Select value={props.value} onChange={e => props.onChange(e.target.value)} displayEmpty >
                        {Object.keys(headLookup).map((key) => <MenuItem value={key}>{headLookup[key]}</MenuItem>)}
                    </Select>
                )
            },
            {
                title: 'Sub', field: 'subLookup', render: rowData => <Typography>{subLookup[rowData.headLookup][rowData.subLookup]}</Typography>, editComponent: props => {
                    const rowData = props.rowData;
                    return(
                    <Select value={props.value} onChange={e => props.onChange(e.target.value)} displayEmpty >
                        {Object.keys(subLookup[rowData.headLookup]).map((key) => <MenuItem value={key}>{subLookup[rowData.headLookup][key]}</MenuItem>)}
                    </Select>
                )}
            },
        ],
        data: testData
    });

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );

};

export default DataTable
