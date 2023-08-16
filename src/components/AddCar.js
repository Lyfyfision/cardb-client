 import React, {useState} from "react";
import {Dialog, DialogActions, DialogTitle, DialogContent, Button, Stack, TextField} from "@mui/material";

function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        price: ''
    });
    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }
    return (
        <div>
            <Button variant="contained"
                    onClick={handleClickOpen}>New Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                    <TextField label="Brand" name="brand" value={car.brand}
                               onChange={handleChange} autoFocus variant="standard"/>
                    <TextField label="Model" name="model" value={car.model}
                               onChange={handleChange} variant="standard"/>
                    <TextField label="Color" name="color" value={car.color}
                               onChange={handleChange} variant="standard"/>
                    <TextField label="Year" name="year" value={car.year}
                               onChange={handleChange} variant="standard"/>
                    <TextField label="Price" name="price" value={car.price}
                               onChange={handleChange} variant="standard"/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCar;