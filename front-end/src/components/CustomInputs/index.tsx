import { InputAdornment, TextField } from "@mui/material"
import { MuiTelInput } from "mui-tel-input"

interface IProps {
    value?: string | number
    defaultValue?: string | number
    required?: boolean
    type?: string
    adorment?: "currency" | "percentage"
    label: string
    name: string
    size?: "small" | "medium"
    fullWidth?: boolean
    error?: boolean
    errorMessage?: string
    rows?: number
    changeFunction: (e: any) => void,
    disabled?: boolean
}
const adorments = { currency: "R$", percentage: "%" }

export const CustomTextInput = ({ disabled = false, value, defaultValue, required, label, name, size, fullWidth, error, type, rows, errorMessage, adorment, changeFunction }: IProps) => {
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
            disabled={disabled}
            InputProps={
                adorment === "currency" ? (
                    { startAdornment: adorment ? <InputAdornment position="start" > {adorments[adorment]}</InputAdornment> : null }
                ) : (
                    { endAdornment: adorment ? <InputAdornment position="end">{adorments[adorment]}</InputAdornment> : null }
                )
            }

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
            onChange={(newValue) => changeFunction({ target: { name: name, value: newValue } })}
            size={size ?? "small"}
            helperText={error ? errorMessage ? errorMessage : "Campo obrigatório!" : null}
        />
    )
}