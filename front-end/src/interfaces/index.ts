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
}