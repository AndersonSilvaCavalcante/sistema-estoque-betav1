import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";

interface IProps {
    titles: Array<ITitles>,
    data: any,
    edit?: boolean,
    remove?: boolean,
    editFunction?: () => void,
    removeFunction?: (id: number) => void,
    sum?: boolean
}


const TableCustom = ({ titles, data, edit, remove, editFunction, removeFunction, sum }: IProps) => {

    const [sunPrice, setSumPrice] = useState<number>(0)

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
                        {titles.map((title: any) => (<TableCell key={title.id} >{data[title.value]}</TableCell>))}

                        <TableCell>
                            <Stack direction="row" spacing={2}>
                                {edit && editFunction && (
                                    <Button variant="outlined" color="warning" startIcon={<EditIcon />} onClick={editFunction} >Editar</Button>
                                )}
                                {remove && removeFunction && (
                                    <Button onClick={() => removeFunction(data.id)} color="error" variant="outlined" startIcon={<DeleteIcon />}>Deletar</Button>
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
    )
}

export default TableCustom