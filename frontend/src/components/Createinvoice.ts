import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'

export const createInvoice = (products: any, customer: any) => {
  console.log(products)
  let today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()

  const todayDate = mm + '/' + dd + '/' + yyyy
  if (products.length > 0) {
    const props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: `Invoice ${customer}`,
      orientationLandscape: false,
      logo: {
        src: 'https://i.imgur.com/LBcPBky.png',
        width: 100.33,
        height: 26.66,
        margin: {
          top: 0,
          left: 0,
        },
      },
      business: {
        name: 'Darsolar energy',
        address: 'Our adress',
        phone: '(+355) 069 11 11 111',
        email: 'email@example.com',
        website: 'darsolarenergy.com/',
      },
      contact: {
        label: `Invoice issued for: Order_id : ${products[0].Order_id}`,
        name: `${customer}`,
      },
      invoice: {
        label: 'Invoice #: ',
        num: products[0].Order_id,
        invGenDate: `Invoice Date: ${todayDate}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: ['#ID', 'Name', 'Price', 'Quantity', 'Designation', 'Total'],
        table: products.map((product: any) => [
          product.id,
          product.name,
          `${product.price}$`,
          product.Qty,
          product.designation,
          Number(product.price) * Number(product.Qty),
        ]),
        invTotalLabel: 'Total:',
        invTotal: `${products.reduce(
          (a: any, b: any) => a + (b['price'] * b['Qty'] || 0),
          0
        )}$`,
        invCurrency: 'ALL',
        invDescLabel: 'Invoice Note',
        invDesc:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
        text: 'The invoice is created on a computer and is valid without the signature and stamp.',
      },
      pageEnable: true,
      pageLabel: 'Page ',
    }
    jsPDFInvoiceTemplate(props) //returns number of pages created
    return true
  }
  return false
}
