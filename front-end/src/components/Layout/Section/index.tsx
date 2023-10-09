"use client"

import { Box, Container, Typography } from "@mui/material"

interface ISection {
    children: React.ReactNode
    title?: string
    description?: string
    className?: string
}

const Section = (props: ISection) => {
    const { title, description, children, className } = props

    return (
        <Box mt={2} sx={{ borderRadius: '20px', boxShadow: '1px 1px 5px' }} p={2}>
            <Typography component="header" variant="h6" className={className ?? ""}>
                {title}
            </Typography>
            {description ?? (
                <Typography component="p" >
                    {description}
                </Typography>)}
            <Box mt={2}>
                {children}
            </Box>
        </Box>
    )
}

export default Section