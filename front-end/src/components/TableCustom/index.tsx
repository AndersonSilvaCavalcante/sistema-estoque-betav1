/**Dependencies */
import React, { useEffect, useState } from "react";

/**Components */
import { Box, Button, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { ConfirmPopup } from "@/components/Popups";

/**Icons */
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LottieFilesComponent from "../LottieFilesComponent";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

/**Animations */
import emptyAnimation from "@/assets/animations/lottie/empty_animation.json"
import moment from "moment";
import { useRouter } from "next/navigation";

interface IProps {
    titles: Array<ITitles>,
    data: any,
    edit?: boolean,
    remove?: boolean,
    view?: boolean,
    editFunction?: (data: any) => void,
    viewFunction?: (data: any) => void,
    removeFunction?: (id: number) => void,
    sum?: boolean,
    valueSale?: number,
    valueBeforeDIscount?: number,
    discountPercent?: number,
    addStock?: boolean,
    othersButtons?: Array<IOthersButtons>,
    viewPagination?: boolean
}

interface IPopupData {
    toggle: boolean
    id: number
}

const valuePrefixes = { currency: "R$", percentage: "%" }

const TableCustom = ({ titles, data, edit, remove, valueSale = 0, valueBeforeDIscount = 0, viewPagination = true, editFunction, removeFunction, sum, discountPercent = 0, view, viewFunction, addStock, othersButtons }: IProps) => {
    const [popupData, setPopupData] = useState<IPopupData>({ toggle: false, id: 0 })

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleClose = () => {
        setPopupData({ toggle: false, id: 0 })
    }
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const router = useRouter()

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
                        {!data && Array.from(new Array(3)).map((val, index) => (
                            <TableRow key={`row${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {Array.from(new Array(titles.length + 1)).map((val, index) => (
                                    <TableCell key={`col${index}`}>
                                        <Skeleton animation="wave" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {data && (viewPagination ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data).map((data: any) => (
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {titles.map((title: ITitles, index: number) => (
                                        title.date ? (
                                            <TableCell key={index} >{moment(data[title.value]).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                        ) : (
                                            title.valuePrefix ? (
                                                title.valuePrefix === "currency" ? (
                                                    <TableCell key={index} >{valuePrefixes[title.valuePrefix]}{data[title.value]}</TableCell>
                                                ) : (
                                                    <TableCell key={index} >{data[title.value]}{valuePrefixes[title.valuePrefix]}</TableCell>
                                                )
                                            ) : (
                                                <TableCell key={index} >{data[title.value]}</TableCell>
                                            )
                                        )
                                    ))}
                                    <TableCell key={"actions"}>
                                        <Stack direction="row" spacing={2}>
                                            {edit && editFunction && (
                                                <Button variant="outlined" color="warning" startIcon={<EditIcon />} onClick={() => editFunction(data)} >Editar</Button>
                                            )}
                                            {remove && removeFunction && (
                                                <Button onClick={() => setPopupData({ toggle: true, id: data.id })} color="error" variant="outlined" startIcon={<DeleteIcon />}>Deletar</Button>
                                            )}
                                            {view && viewFunction && (
                                                <Button onClick={() => viewFunction(data)} color="warning" variant="outlined" startIcon={<RemoveRedEyeIcon />}>Visualizar</Button>
                                            )}
                                            {addStock && (
                                                <Button onClick={() => router.replace(`/products/form/edit/${data.id}`)} color="success" variant="outlined" startIcon={<AddIcon />}>Adicionar estoque</Button>
                                            )}
                                            {othersButtons?.map(o =>
                                                o.viewButton(data) && (
                                                    <Button key={o.title} onClick={() => o.click(data)} color={o.color} variant="outlined" startIcon={<AddIcon />}>{o.title}</Button>
                                                )
                                            )}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {valueBeforeDIscount !== 0 && (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><Typography>Subtotal</Typography></TableCell>
                                <TableCell colSpan={2}><Typography>R$ {(valueBeforeDIscount).toFixed(2)}</Typography></TableCell>
                            </TableRow>
                        )}
                        {discountPercent !== 0 && (
                            <>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell><Typography>Desconto</Typography></TableCell>
                                    <TableCell colSpan={2}><Typography>{discountPercent} %</Typography></TableCell>
                                </TableRow>
                            </>
                        )}
                        {valueSale !== 0 && (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><Typography variant="h6">TOTAL</Typography></TableCell>
                                <TableCell colSpan={2}><Typography variant="h6">R$ {(valueSale).toFixed(2)}</Typography></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {viewPagination && (
                <TablePagination
                    component="div"
                    count={data?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={'Linhas por página'}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            {data && data.length == 0 && (
                <Box mt={5} mb={5} sx={{
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center'
                }}>
                    <Box>
                        <LottieFilesComponent animation={emptyAnimation} loop={true} />
                        <Typography variant={"h5"} component={"p"}>Não há dados</Typography>
                    </Box>
                </Box>
            )}
        </React.Fragment>
    )
}

export default TableCustom