import { INTERNAL_HEADERS } from "next/dist/shared/lib/constants"

export { }
declare global {
    //Payment Form
    type PaymentForm = "Cartão de Crédito a Vista" | "Cartão de Crédito Parcelado" | "Cartão de Débito" | "PIX" | "Dinheiro" | ""

    //Supplier
    interface ISupplier {
        id: number
        name: string
        contact: string
    }

    //Product

    interface IProduct {
        id: number,
        name: string,
        barcode: string,
        supplierId: number,
        qtdMin: number | undefined,
        qtdCurrent: number| undefined,
        costPrice: number| undefined,
        salePrice: number| undefined,
        type: string,
        oldQtd: number,
        qtdChange: number,
        perProfit: number | undefined,
        valueProfit: number | undefined,
        status: string
    }

    interface ICLient {
        id: number,
        name: string,
        plate: string,
        dateCreated: Date,
        model: string,
        phone: string

    }

    interface ISale {
        id: number,
        products: Array<IProductSale>,
        productsString: string,
        qtd: number | undefined,
        clientId: number | string,
        value: number,
        clientName: string,
        discount: number,
        dateCreated: Date,
        valueBeforeDIscount: number,
        valueCostPrice: number,
        paymentForm: PaymentForm,
        amountPaid: number | undefined,
        customerChangeCash: number,
        paymentInstallments: number
    }

    //usado na tabela de venda de produtos 
    interface IProductSale {
        id: number
        productName: string
        productId: number
        newQtd: number
        qtdChange: number | undefined
        totalCostPrice: number
        totalCurrentPrice: number
        currentPrice: number
        oldQtd: number
    }

    //order service

    interface IOrderService {
        clientId: number | null,
        services: string,
        comments: string
    }

    interface IServicesToBePerformed {
        id: number,
        name: string,
        salePrice: number,
    }

    // Tabela
    interface ITitles {
        label: string,
        value: string
        valuePrefix?: "currency" | "percentage"
        date?: boolean
    }

    interface IOthersButtons {
        title: string,
        click: (data: any) => void,
        viewButton: (data: any) => boolean,
        color: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning" 
    }

}