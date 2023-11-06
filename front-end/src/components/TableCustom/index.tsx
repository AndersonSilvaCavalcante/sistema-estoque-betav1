/**Dependencies */
import React, { useEffect, useState } from "react";

/**Components */
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ConfirmPopup } from "@/components/Popups";

/**Icons */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LottieFilesComponent from "../LottieFilesComponent";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

/**Animations */
import emptyAnimation from "@/assets/animations/lottie/empty_animation.json"
import moment from "moment";

interface IProps {
    titles: Array<ITitles>,
    data: any,
    edit?: boolean,
    remove?: boolean,
    view?: boolean,
    editFunction?: (data: any) => void,
    viewFunction?: (data: any) => void,
    removeFunction?: (id: number) => void,
    sum?: boolean
    subValue?: number
}

interface IPopupData {
    toggle: boolean
    id: number
}

const valuePrefixes = { currency: "R$" }

const TableCustom = ({ titles, data, edit, remove, editFunction, removeFunction, sum, subValue = 0, view, viewFunction }: IProps) => {
    const [popupData, setPopupData] = useState<IPopupData>({ toggle: false, id: 0 })
    const [sumPrice, setSumPrice] = useState<number>(0)
    const handleClose = () => {
        setPopupData({ toggle: false, id: 0 })
    }

    const sumValues = () => {
        let sum = 0

        data.map((data: { salePrice: number, totalCurrentPrice: number }) => {
            if (data.salePrice) {
                sum = sum + data.salePrice
            } else {
                sum = sum + data.totalCurrentPrice
            }
        })

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
                                {titles.map((title: ITitles, index: number) => (
                                    title.date ? (
                                        <TableCell key={index} >{moment(data[title.value]).format("DD/MM/YYYY")}</TableCell>
                                    ) : (
                                        <TableCell key={index} >{title.valuePrefix ? valuePrefixes[title.valuePrefix] : null}{data[title.value]}</TableCell>
                                    )
                                ))}
                                <TableCell>
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
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {subValue !== 0 && (
                            <>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>SubTotal</TableCell>
                                    <TableCell colSpan={2}>R$ {sumPrice}</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Desconto</TableCell>
                                    <TableCell colSpan={2}>R$ {subValue}</TableCell>
                                </TableRow>
                            </>
                        )}
                        {sum && (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>TOTAL</TableCell>
                                <TableCell colSpan={2}>R$ {sumPrice - subValue}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {data.length == 0 && (
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