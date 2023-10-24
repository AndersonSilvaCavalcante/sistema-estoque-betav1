import { TextField } from "@mui/material"

interface IProps {
    value?: string
    defaultValue?: string
    required?: boolean
    label: string
    name: string
    size?: "small" | "medium"
    fullWidth?: boolean
    error?: boolean
    errorMessage?: string
    rows?: number
    changeFunction: (e: any) => void,
}

export const CustomTextInput = ({ value, defaultValue, required, label, name, size, fullWidth, error, rows, errorMessage, changeFunction }: IProps) => {
    return (
        <TextField
            id={error ? "outlined-error-helper-text" : "outlined-basic"}
            error={error}
            defaultValue={defaultValue}
            value={value}
            required={required}
            onChange={changeFunction}
            label={label}
            name={name}
            fullWidth={fullWidth}
            size={size || "small"}
            variant="outlined"
            rows={rows}
            helperText={error ? errorMessage ? errorMessage : "Campo obrigatório!" : null}
        />
    )
}