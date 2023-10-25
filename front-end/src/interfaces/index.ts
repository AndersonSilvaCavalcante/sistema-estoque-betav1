import { INTERNAL_HEADERS } from "next/dist/shared/lib/constants"

export { }
declare global {

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
        qtdMin: number,
        qtdCurrent: number,
        costPrice: number,
        salePrice: number
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
        products: any,
        qtd: number,
        clientId: number,
        value: number,
        clientName: string,
        discount: number,
        dateCreated: Date
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
        valuePrefix?: "currency"
    }

}