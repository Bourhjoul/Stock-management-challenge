export class CreateOrderDto {
  customerId: number;
  products: [
    {
      productID: number;
      Qty: number;
    },
  ];
}
