import { Divider } from "@mui/material";
import styled from "styled-components";


const ContainerCustom = styled.div`
  padding: 15px;
  background-color: #FFF;
  border-radius: 10px
`;

interface IProps {
    children: React.ReactNode,
    title: string
}

const Container = ({ children, title }: IProps) => {
    return (
        <ContainerCustom>
            <label>{title}</label>
            <Divider></Divider>
            {children}
        </ContainerCustom>
    )
}

export default Container