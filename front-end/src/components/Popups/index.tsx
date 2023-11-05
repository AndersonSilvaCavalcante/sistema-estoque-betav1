/**Dependencies */
import React from "react";

/**Components */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

/**Icons */
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

interface IProps {
    title?: string
    toggle: boolean
    message?: string
    children?: React.ReactNode
    confirmButtonTitle?: string
    confirmButtonIcon?: React.ReactNode
    confirmAction: () => void
    cancelFunction: () => void
}

export const ConfirmPopup = ({ toggle, title, message, confirmAction, cancelFunction }: IProps) => {
    const dialoConfirm = () => {
        confirmAction()
        cancelFunction()
    }

    return (
        <Dialog open={toggle} onClose={() => cancelFunction()}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: '5px 8px'
            }}>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={() => cancelFunction()} startIcon={<CancelIcon />} >Cancelar</Button>
                <Button color="success" variant="contained" onClick={dialoConfirm} startIcon={<CheckIcon />}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}

export const CustomPopup = ({ toggle, title, message, children, confirmButtonTitle, confirmButtonIcon, confirmAction, cancelFunction }: IProps) => {
    return (
        <Dialog open={toggle} onClose={() => cancelFunction()} maxWidth={"lg"}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: '5px 8px'
            }}>
                <DialogContentText>
                    {message}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={() => cancelFunction()} startIcon={<CancelIcon />} >Cancelar</Button>
                <Button color="success" variant="contained" onClick={confirmAction} startIcon={confirmButtonIcon || <CheckIcon />}>{confirmButtonTitle || "Confirmar"}</Button>
            </DialogActions>
        </Dialog>
    )
}