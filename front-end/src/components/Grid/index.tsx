import { Box } from "@mui/material"

const Grid = (childrens: any) => {
    return (
        <Box className="grid-container" pt={2}>
            {childrens.map((children: React.ReactNode) => (
                <Box sx={{ minWidth: 275 }} className="grid-item">
                    {children}
                </Box>))}
        </Box>
    )
}
export default Grid