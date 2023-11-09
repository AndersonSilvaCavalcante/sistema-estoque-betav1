import { Divider } from "@mui/material";
import styled from "styled-components";


const CardStyle = styled.div`
    padding: 15px;
    border-radius: 10px;
    border: 1px solid silver;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 300;
`;

interface IProps {
    children: React.ReactNode,
    className?: string
}

const CardCustom = ({ children, className = '' }: IProps) => {
    return (
        <CardStyle className={className}>
            {children}
        </CardStyle>
    )
}

export default CardCustom