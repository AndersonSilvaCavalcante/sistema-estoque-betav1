import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

interface IProps {
    onCLick: () => void
    title: string
}

export const ButtonPlus = ({ onCLick, title }: IProps) => {
    return (
        <Button
            onClick={onCLick}
            color="success"
            variant="contained"
            endIcon={<AddIcon />}>
            {title}
        </Button>

    )
}