"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Actions */
import { deleteSupplierById, getSuppliers } from "@/actions/suppliers"

/**Components */
import Section from "@/components/Layout/Section"
import { Box, Button, Container, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"

/**Icons */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const titles: Array<string> = ["ID", "Nome", "Telefone", "Ações"]

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': { m: 1, width: '25ch' }
};

const Suppliers: NextPage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [suppliers, setSuppliers] = useState(Array<ISupplier>)

    const returnSuppliersList = async () => {
        setSuppliers(await getSuppliers())
    }

    const deleteSupplier = async (id: ISupplier["id"]) => {
        await deleteSupplierById(id)
        returnSuppliersList()
    }

    useEffect(() => {
        returnSuppliersList()
    }, [])

    return (
        <Section title="Fornecedores">
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}
                    component="form"
                    noValidate
                    autoComplete="off">
                    <Box>
                        <Typography component="p" variant="h6">Cadastrar Fornecedor</Typography>
                    </Box>
                    <Box>
                        <TextField id="outlined-basic" label="Nome" variant="outlined" />
                    </Box>
                    <Box>
                        <TextField id="outlined-basic" label="Contato" variant="outlined" />
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="error" onClick={handleClose} startIcon={<CancelIcon />} >Cancelar</Button>
                        <Button color="success" variant="outlined" startIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </Modal>
            <Section title="Filtrar Fornecedores">
                <></>
                <Button onClick={handleOpen} variant="outlined" endIcon={<SaveIcon />} color="success">Cadastrar Fornecedor</Button>
            </Section>
            <Section>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {titles.map((title: string) => (<TableCell>{title}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((supplier: ISupplier) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {supplier.id.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {supplier.name}
                                    </TableCell>
                                    <TableCell>{supplier.contact}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="outlined" color="warning" startIcon={<EditIcon />} onClick={handleOpen} >Editar</Button>
                                            <Button onClick={() => deleteSupplier(supplier.id)} color="error" variant="outlined" startIcon={<DeleteIcon />}>Deletar</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Section>
        </Section>
    )
}

export default Suppliers