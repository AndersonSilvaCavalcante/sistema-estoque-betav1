'use client'

import { NextPage } from "next"
import React from 'react'
import styled from "styled-components";

import CircleIcon from '@mui/icons-material/Circle';
import Container from "@/components/Container"
import OrderService from "@/actions/orderServices";


const Card = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid silver;
  margin-top: 10px;
`;


const ContainerOrderService = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;


const teste = async () => {
    await OrderService.getListOrderService()
}

const OrderServices: NextPage = () => {
    return (
        <React.Fragment>
            <Container title="Abertas">
                <ContainerOrderService>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>asdasd</label>
                            <CircleIcon color='success' />
                        </div>
                        <div>
                            <label>jkasdhasd</label>
                        </div>
                        <div>
                            <label>Criada em: asjdahskd</label>
                        </div>
                    </Card>
                </ContainerOrderService>
            </Container>
        </React.Fragment>
    )
}

export default OrderServices