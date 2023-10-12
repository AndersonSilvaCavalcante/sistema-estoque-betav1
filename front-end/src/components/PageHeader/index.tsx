import { Box, Typography } from "@mui/material"

interface IProps {
    title: string
    children: React.ReactNode
}

const PageHeader = ({ title, children }: IProps) => {
    return (
        <Box mb={2} sx={{ display: 'flex' }}>
            <Box flexGrow={1}>
                <Typography component={'h1'} variant="h5" >{title}</Typography>
            </Box>
            <Box ml={2}>
                {children}
            </Box>
        </Box>
    )
}

export default PageHeader