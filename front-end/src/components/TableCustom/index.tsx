/**Dependencies */
import React, { useEffect, useState } from "react";

/**Components */
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ConfirmPopup } from "@/components/Popups";

/**Icons */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    titles: Array<ITitles>,
    data: any,
    edit?: boolean,
    remove?: boolean,
    editFunction?: (data: any) => void,
    removeFunction?: (id: number) => void,
    sum?: boolean
}

interface IPopupData {
    toggle: boolean
    id: number
}

const valuePrefixes = {currency: "R$"}

const TableCustom = ({ titles, data, edit, remove, editFunction, removeFunction, sum }: IProps) => {
    const [popupData, setPopupData] = useState<IPopupData>({ toggle: false, id: 0 })
    const [sunPrice, setSumPrice] = useState<number>(0)
    const handleClose = () => {
        setPopupData({ toggle: false, id: 0 })
    }

    const sumValues = () => {
        let sum = 0

        data.map((data: { salePrice: number; }) => (
            sum = sum + data.salePrice
        ))

        setSumPrice(sum)
    }

    useEffect(() => {
        sumValues()
    }, [data])

    return (
        <React.Fragment>
            {removeFunction && <ConfirmPopup
                toggle={popupData.toggle}
                title={"Deletar Item"}
                message={"Confirma a exclusão desse item?"}
                confirmAction={() => removeFunction(popupData.id)}
                cancelFunction={() => handleClose()}
            />}
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {titles.map((title: ITitles, index: number) => (<TableCell key={index} >{title.label}</TableCell>))}
                            {(edit || remove) && (
                                <TableCell>Ações</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((data: any, index: number) => (
                            <TableRow
                                key={data.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {titles.map((title: ITitles, index: number) => (<TableCell key={index} >{title.valuePrefix ? valuePrefixes[title.valuePrefix] : null}{data[title.value]}</TableCell>))}

                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        {edit && editFunction && (
                                            <Button variant="outlined" color="warning" startIcon={<EditIcon />} onClick={() => editFunction(data)} >Editar</Button>
                                        )}
                                        {remove && removeFunction && (
                                            <Button onClick={() => setPopupData({ toggle: true, id: data.id })} color="error" variant="outlined" startIcon={<DeleteIcon />}>Deletar</Button>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                         {sum && (
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>TOTAL</TableCell>
                        <TableCell colSpan={2}>R$ {sunPrice}</TableCell>
                    </TableRow>
                )}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default TableCustom