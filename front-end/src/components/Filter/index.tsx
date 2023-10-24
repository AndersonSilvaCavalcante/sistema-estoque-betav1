/**Dependencies */


/**Components */
import { Box, Stack, Button } from "@mui/material"
import ContainerCustom from "../Container"
import { CustomTextInput } from "../CustomInputs"

/**Icons */
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    children: React.ReactNode
    title?: string
    cleanFunction: () => void
    filterFucntion: () => void
}

const Filter = ({ title, children, cleanFunction, filterFucntion }: IProps) => {
    return (
        <ContainerCustom title={title || "Filtrar"}>
            <Box mb={2} mt={2}>
                {children}
            </Box>
            <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                <Stack direction="row" spacing={2}>
                    <Button onClick={cleanFunction} color="error" variant="outlined" endIcon={<CloseIcon />}>Limpar</Button>
                    <Button onClick={filterFucntion} color="success" variant="outlined" endIcon={<FilterListIcon />}>Filtrar</Button>
                </Stack>
            </Box>
        </ContainerCustom>
    )
}

export default Filter