/**Dependencies */


/**Components */
import { Box, Stack, Button } from "@mui/material"
import ContainerCustom from "../Container"
import { CustomTextInput } from "../CustomInputs"

/**Icons */
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
    title?: string
    cleanFunction: () => void
    filterFucntion: () => void
}

const DGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;



const Filter = ({ title, children, cleanFunction, filterFucntion }: IProps) => {
    return (
        <ContainerCustom title={title || "Filtrar"}>
            <DGrid>
                {children}
            </DGrid>
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