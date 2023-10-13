"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Actions */
import { deleteSupplierById, getSuppliers, saveSupplier } from "@/actions/suppliers"

/**Components */
import Section from "@/components/Layout/Section"
import { Box, Button, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"

/**Icons */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Container from "@/components/Container"
import PageHeader from "@/components/PageHeader"

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [suppliers, setSuppliers] = useState(Array<ISupplier>)
    const [supplier, setSupplier] = useState<ISupplier>()
    const [filter, setFilter] = useState<ISupplier>()

    const returnSuppliersList = async () => {
        setSuppliers(await getSuppliers())
    }

    const saveNewSupplier = async (supplier: ISupplier) =>{
        await saveSupplier(supplier)
        handleClose()
        returnSuppliersList()
    }
    
    const deleteSupplier = async (id: ISupplier["id"]) => {
        await deleteSupplierById(id)
        returnSuppliersList()
    }

    const filterSupplier = async () => {
        setSuppliers(await getSuppliers(filter))
    }

    const cleanFilterSupplir = async () => {
        setFilter({ name: '' })
        returnSuppliersList()
    }
    useEffect(() => {
        console.log("filtro", filter)
    }, [filter])

    useEffect(() => {
        returnSuppliersList()
    }, [])

    return (
        <React.Fragment>
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
                        <Typography component="p" variant="h6">Fornecedor</Typography>
                    </Box>
                    <Box>
                        <TextField value={supplier?.name} id="outlined-basic" required onChange={(e)=> setSupplier({name: e.target.value, contact: supplier?.contact})} label="Nome" variant="outlined" />
                    </Box>
                    <Box>
                        <TextField id="outlined-basic" value={supplier?.contact} required onChange={(e)=> setSupplier({name: supplier?.name, contact: e.target.value})} label="Contato" variant="outlined" />
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="error" onClick={handleClose} startIcon={<CancelIcon />} >Cancelar</Button>
                        <Button color="success" variant="outlined" onClick={() => saveNewSupplier(supplier)} startIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </Modal>
            <PageHeader title="Fornecedores">
                <Button onClick={handleOpen} color="success" variant="outlined" endIcon={<SaveIcon />}>Cadastrar Fornecedor</Button>
            </PageHeader>
            <Container title="Filtrar">
                <Box mb={2} mt={2}>
                    <TextField value={filter?.name} onChange={(e) => setFilter({ name: e.target.value })} id="outlined-basic" label="Nome" size="small" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => cleanFilterSupplir()} color="error" variant="outlined" endIcon={<SaveIcon />}>Limpar</Button>
                        <Button onClick={() => filterSupplier()} color="success" variant="outlined" endIcon={<SaveIcon />}>Filtrar</Button>
                    </Stack>
                </Box>
            </Container>
            <Box mt={4}>
                <Container>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {titles.map((title: string) => (<TableCell>{title}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suppliers.map((supplier: ISupplier) => (
                                <TableRow
                                    key={supplier.id.toString()}
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
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Suppliers