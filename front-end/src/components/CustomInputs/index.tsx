import { TextField } from "@mui/material"
import { MuiTelInput } from "mui-tel-input"

interface IProps {
    value?: string | number
    defaultValue?: string
    required?: boolean
    type?: string
    label: string
    name: string
    size?: "small" | "medium"
    fullWidth?: boolean
    error?: boolean
    errorMessage?: string
    rows?: number
    changeFunction: (e: any) => void,
}

export const CustomTextInput = ({ value, defaultValue, required, label, name, size, fullWidth, error, type, rows, errorMessage, changeFunction }: IProps) => {
    return (
        <TextField
            type={type}
            error={error}
            defaultValue={defaultValue}
            value={value}
            required={required}
            onChange={changeFunction}
            label={label}
            name={name}
            fullWidth={fullWidth}
            size={size ?? "small"}
            variant="outlined"
            rows={rows}
            helperText={error ? errorMessage ? errorMessage : "Campo obrigatório!" : null}
        />
    )
}

export const CustomTelInput = ({ value, required, label, name, size, fullWidth, error, errorMessage, changeFunction }: IProps) => {
    return (
        <MuiTelInput
            value={value?.toString()}
            required={required}
            fullWidth={fullWidth}
            error={error}
            defaultCountry="BR"
            forceCallingCode
            disableDropdown
            flagSize="small"
            label={label}
            name={name}
            onChange={(newValue) => changeFunction(newValue)}
            size={size ?? "small"}
            helperText={error ? errorMessage ? errorMessage : "Campo obrigatório!" : null}
        />
    )
}