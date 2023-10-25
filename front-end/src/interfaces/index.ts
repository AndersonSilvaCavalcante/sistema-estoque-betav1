import { INTERNAL_HEADERS } from "next/dist/shared/lib/constants"

export { }
declare global {
    interface ISupplier {
        id: Number
        name: string
        contact: string
    }

    interface IProduct {
        id: Number,
        name: string,
        barcode: string,
        supplierId: Number,
        qtdMin: Number,
        qtdCurrent: Number,
        costPrice: Number,
        salePrice: Number
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
        id: Number,
        name: string,
        salePrice: number,
    }

    //

    // Tabela
    interface ITitles {
        label: string,
        value: string
    }
}