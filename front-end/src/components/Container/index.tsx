import { Divider } from "@mui/material";
import styled from "styled-components";


const ContainerStyle = styled.div`
  padding: 15px;
  background-color: #FFF;
  border-radius: 10px;
  margin-bottom: 20px;
`;

interface IProps {
    children: React.ReactNode
    title?: string
}

const ContainerCustom = ({ children, title }: IProps) => {
    return (
        <ContainerStyle>
            {typeof title == 'string' ? (<>
                <label>{title}</label>
                <Divider></Divider>
            </>
            ) : null}
            {children}
        </ContainerStyle>
    )
}

export default ContainerCustom