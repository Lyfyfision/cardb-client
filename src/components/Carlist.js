import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../constants";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {gridClasses, Snackbar, Stack, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const fetchCars = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars', {
            headers: {'Authorization' : token}
        })
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
    }
    const onDelClick = (url) => {
        if (window.confirm("Are you sure?")) {
            const token = sessionStorage.getItem("jwt");
            fetch(url, {
                method: 'DELETE', headers: {'Authorization' : token}})
                .then(response => {
                    if (response.ok) {
                    fetchCars()
                    setOpen(true);
                    }
                    else {
                    alert('Something wrong');
                    }
                })
                .catch(err => console.error(err));
        }
    }
    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'year', headerName: 'Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <EditCar
                data = {row}
                updateCar = {updateCar}
                />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color={"error"}/>
                </IconButton>
        }
    ];

    useEffect(() => {
        fetchCars()
    }, []);

    const addCar = (car) => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL  + 'api/cars', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                }
                else {
                    alert('Something wrong');
                }
            })
            .catch(err => console.error(err));
    }

    const updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    fetchCars()
                }
                else {
                    alert('Something wrong')
                }
            })
            .catch(err => console.error(err))
    }

    return(
        <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar}/>
            </Stack>
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
            rows={cars}
            columns={columns}
            getRowId={row => row._links.self.href}
            components={{Toolbar: CustomToolbar}}
            />
            <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Car deleted"
            />
        </div>
        </React.Fragment>
    );
}

function CustomToolbar() {

    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

export default Carlist;