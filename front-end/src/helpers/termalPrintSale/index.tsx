const qz = require("qz-tray");
import moment from "moment";
import { toast } from "react-toastify";

const printSale = async (data: Array<string>) => {
    await qz.websocket.connect().then(() => {
        return qz.printers.find("POS-58");
    }).then(async (printer: any) => {
        var config = qz.configs.create(printer, { encodeURI: "PC3847" })
        toast.info("Imprimindo recibo...")
        return await qz.print(config, data);
    }).then(() => {
        toast.success("Recibo Impresso!")
        return qz.websocket.disconnect();
    }).catch((err: any) => {
        toast.error("Falha ao imprimir recibo!")
        return qz.websocket.disconnect();
    });
}

const generateTermalPrintSale = async (sale: ISale) => {
    const recepeitHeader: Array<string> = [
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x21' + '\x30', // em mode on
        'CRIS ELEGANCE',
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A',                   // line break
        '\x1B' + '\x4D' + '\x31', //small text
        'RUA 107 N 231B, TIMBO, MARACANAU, CEARA' + '\x0A',
        '(85)9 9437-2496' + '\x0A',
        'INSTAGRAM: @CRIS.ELEGANCE.INTIMIDADES' + '\x0A',
        'CNPJ: 44.737.113/0001-40' + '\x0A',
        '\x1B' + '\x4D' + '\x30', // normal text
        '\x1B' + '\x61' + '\x30', // left align,
        '\x1B' + '\x4D' + '\x31', //small text
        `VENDA No: ${sale.id}` + ' - ' + moment(sale.dateCreated).format("DD/MM/YYYY HH:mm:ss") + '\x0A',
        '\x1B' + '\x4D' + '\x30', // normal text
        `CLIENTE: ${sale.clientName}` + '\x0A',
        '\x1B' + '\x4D' + '\x31', //small text
        '------------------------------------------' + '\x0A',
        '# | COD | NOME | QTD X R$ UN | R$ TOTAL' + '\x0A',
        '------------------------------------------' + '\x0A'
    ]

    const paymentData: Array<string> = [
        '------------------------------------------' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        `SUBTOTAL: R$${sale.valueBeforeDIscount.toFixed(2)}` + '\x0A',
        `DESCONTO: ${sale.discount}%` + '\x0A',
        `TOTAL: R$${sale.value.toFixed(2)}` + '\x0A',
        `VALOR PAGO: R$${sale.amountPaid && sale.amountPaid.toFixed(2)}` + '\x0A',
        `TROCO: R$${sale.customerChangeCash.toFixed(2)}` + '\x0A',
        `FORMA PGTO: ${sale.paymentForm}` + '\x0A',
        `PARCELAS: ${sale.paymentInstallments}` + '\x0A',
        '------------------------------------------' + '\x0A'
    ]

    const recepeitFooter = [
        '\x1B' + '\x61' + '\x31', // center align
        'VENDEDOR: VENDEDOR PADRAO' + '\x0A',
        '------------------------------------------' + '\x0A',
        '*OBRIGADO E VOLTE SEMPRE!*' + '\x0A',
        '\x0A',                   // line break
        '\x0A',                   // line break
        '\x0A',                   // line break
        '\x0A',                   // line break
        '\x0A',                   // line break
        //'\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
    ]

    let tableProducts: Array<any> = []

    sale.products.map((product: any, index) => {
        tableProducts.push(
            '\x1B' + '\x61' + '\x30', // left align
            `#${index} ${product['ProductId']} ${product['ProductName']}` + '\x0A',
            '\x1B' + '\x61' + '\x32', // right align
            `${product['QtdChange']} X R$${product['CurrentPrice'].toFixed(2)} -> R$${product['TotalCurrentPrice'].toFixed(2)}` + '\x0A'
        )
    })
    return await printSale(recepeitHeader.concat(tableProducts, paymentData, recepeitFooter))
}

export default generateTermalPrintSale