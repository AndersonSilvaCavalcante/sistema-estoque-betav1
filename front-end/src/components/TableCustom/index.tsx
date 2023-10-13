import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    titles: Array<ITitles>,
    data: Array<ISupplier>,
    edit?: boolean,
    remove?: boolean,
    editFunction?: () => void,
    removeFunction?: (id: number) => void
}


const TableCustom = ({ titles, data, edit, remove, editFunction, removeFunction }: IProps) => {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {titles.map((title: ITitles) => (<TableCell>{title.label}</TableCell>))}
                    {(edit || remove) && (
                        <TableCell>Ações</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((data: any) => (
                    <TableRow
                        key={data.id.toString()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {titles.map((title: any) => (<TableCell>{data[title.value]}</TableCell>))}

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
            </TableBody>
        </Table>
    )
}

export default TableCustom