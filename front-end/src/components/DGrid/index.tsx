import styled from "styled-components";

interface IProps {
    children: React.ReactNode
}

const GridCustom = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;



const DGrid = ({ children }: IProps) => {
    return (
        <GridCustom>
            {children}
        </GridCustom>
    )
}

export default DGrid