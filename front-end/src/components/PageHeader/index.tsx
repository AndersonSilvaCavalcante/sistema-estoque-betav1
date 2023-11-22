import { Typography } from "@mui/material"
import DGrid from "../DGrid"
import styled from "styled-components";

interface IProps {
    title: string
    children?: React.ReactNode
}

const PageHeader = ({ title, children }: IProps) => {
    return (
        <div className="d-flex-header">
            <Typography component={'h1'} variant="h5" >{title}</Typography>
            {children}
        </div>
    )
}

export default PageHeader