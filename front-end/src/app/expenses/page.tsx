"use client"

/**Dependencies */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**Components */
import PageHeader from "@/components/PageHeader";
import { Box, Collapse, IconButton, Paper, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Filter from "@/components/Filter";
import { toast } from "react-toastify";
import { ButtonPlus } from "@/components/ButtonPlus";
import ExpenseService from "@/actions/expenses";
import moment from "moment";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
export interface IFilter {
    firstDate: Dayjs
    lastDate: Dayjs
}

export interface IListExpenses {
    title: string,
    values: Array<IExpense>
}

function Row(props: { row: IListExpenses }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data de Criação</TableCell>
                                        <TableCell>Data de Atualização</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Valor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.values.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell>{moment(expense.dateCreated).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                            <TableCell>{moment(expense.dateUpdated).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                            <TableCell>{expense.name}</TableCell>
                                            <TableCell>R$ {expense.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const Products: NextPage = () => {
    const router = useRouter()
    const initialFIlter: IFilter = { firstDate: dayjs(new Date()), lastDate: dayjs(new Date()) }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)

    const [listExpenses, setListExpenses] = useState<Array<IListExpenses>>([])

    const getExpenses = async (clean?: boolean) => {
        try {
            const payload = {
                firstDate: moment(new Date(filter.firstDate.toDate().getFullYear(), filter.firstDate.toDate().getMonth(), 1)).format("YYYY-MM-DD"),
                lastDate: moment(new Date(filter.lastDate.toDate().getFullYear(), filter.lastDate.toDate().getMonth() + 1, 0)).format("YYYY-MM-DD")
            }

            const { data } = await ExpenseService.getListExpenseS(payload)
            const dates: Array<string> = data.map((d: IExpense) => moment(d.datePortion).format("MMMM/YYYY"))

            const list: Array<IListExpenses> = [...new Set(dates)].map(date => ({
                title: date,
                values: data.filter((d: { datePortion: string | number | Date; }) => moment(d.datePortion).format("MMMM/YYYY") === date)
            }))

            setListExpenses(list)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const changeFilterValues = (value: any, name: string) => {
        setFilter({ ...filter, [name]: value })
    }

    const cleanFilters = () => {
        setFilter(initialFIlter)
        getExpenses(true)
    }

    useEffect(() => {
        getExpenses()
    }, [])


    return (
        <React.Fragment>
            <PageHeader title="Despesas">
                <ButtonPlus onCLick={() => router.push("/expenses/form/register")} title="Cadastrar Despesa" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getExpenses(false)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker views={['month', 'year']} value={filter.firstDate} onChange={newValue => changeFilterValues(newValue, "firstDate")} />
                    <DatePicker views={['month', 'year']} value={filter.lastDate} onChange={newValue => changeFilterValues(newValue, "lastDate")} />
                </LocalizationProvider>
            </Filter>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {listExpenses.map((row) => (
                            <Row key={row.title} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment >
    )
}

export default Products