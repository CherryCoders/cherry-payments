<p align="center">
  <img src="https://cdn.discordapp.com/attachments/551211620924260392/925198303598100580/cherry_code.png" width="240"/>
</p>

## Sobre a ferramenta

Ferramenta focado em auxiliar no desenvolvimento de web server tanto para client side quanto para server side, será constantemente atualizado conforme alguma ferramentas que são bastante utilizadas serem adicionado a essa framework.

**OBS:** Focado para meus trabalhos exclusivamente freelancer.

## Exemplo de inicialização

```
npm install eduardommelo/cherry-payments
```

```js
const { Client } = require("cherry-payments");

// Client id e secret você pega em: https://developer.paypal.com/developer/applications
const checkout = new Client({
  methods: {
    // aqui você define os metodos de pagamento aqui dentro
    mercadopago: {
      sandbox: true,
      token: "Access token da aplicação mercado pago",
    },
    paypal: {
      account: {
        clientId: "Client id account",
        secret: "secret token paypal account",
      },
      sandbox: true, // habilitar modo sandbox do modulo de pagamento
      redirect: {
        cancel: "https://teste.example/pagamento_cancelado", // redirecionamentos
        accept: "https://teste.example/pagamento_aprovado",
      },
    },
  },
});

(async () => {
  //MERCADOPAGO
  // Adicionar metodo de pagamento (MercadoPago)
  const mercadopago = await checkout.add("mercadopago");

  // Criar usuario testes (sandbox)
  const user = await mercadopago.users.create({
    site_id: "MLB",
  });

  // editar saldo do usuario de teste
  const userAmout = await mercadopago.users.updateAmount({
    id: user.data.id,
    amount: 50000.23,
  });
  // listar usuarios testes
  const list = await mercadopago.users.list();
  // criar preference
  const payment = await mercadopago.preferences.create({
    items: [
      {
        title: "teste produto",
        description: "Descriçao do meu produto",
        quantity: 1,
        unit_price: 10,
      },
    ],
    external_reference: "ABCD",
  });

  // consultar a preference (da preference criada)
  const merchant = await mercadopago.merchants.fetch("4463600701");

  // criar pagamento
  const createPayment = await mercadopago.payments.create({
    additional_info: {
      items: [
        {
          id: "4462022673",
          title: "teste produto",
          description: "Descriçao do meu produto",
          quantity: 1,
          unit_price: 1,
        },
      ],
    },
    payment_method_id: "visa",
    transaction_amount: 1,
  });

  // ======== FIM MERCADOPAGO

  // Adicionar metodo de pagamento (Paypal)
  const paypal = await checkout.add("paypal");
  /* Criar um pedido de pagamento, caso seja AUTHORIZE o intent ele vai gerar um pagamento que ira aguardar o vendedor aprovar o pagamento, CAPTURE para já autorizar pagamento assim que o comprador aprova
    mais informações em: https://developer.paypal.com/docs/api/orders/v2/
    */
  const payUser = await paypal.payouts.create(
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "BRL",
            value: "100.00",
          },
        },
      ],
    },
    {
      brand_name: "Teste",
    }
  );

  // fornecer autorização caso usuario enviou como intent AUTHORIZE
  await paypal.payouts.authorize("token do pagamento");

  //capturar o pagamento para efetuar o pagamento
  await paypal.payouts.capture("token de pagamento");

  // pegar informações do pedido criado do cliente
  await paypal.payouts.get("token de pagamento");

  // gerar um pagamento por paypal utilizando a v1
  await paypal.payments.create({
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: "30.11",
          currency: "USD",
          details: {
            subtotal: "30.00",
            tax: "0.07",
            shipping: "0.03",
            handling_fee: "1.00",
            shipping_discount: "-1.00",
            insurance: "0.01",
          },
        },
        description: "The payment transaction description.",
        custom: "EBAY_EMS_90048630024435",
        invoice_number: "48787589673",
        payment_options: {
          allowed_payment_method: "INSTANT_FUNDING_SOURCE",
        },
        soft_descriptor: "ECHI5786786",
        item_list: {
          items: [
            {
              name: "hat",
              description: "Brown hat.",
              quantity: "5",
              price: "3",
              tax: "0.01",
              sku: "1",
              currency: "USD",
            },
            {
              name: "handbag",
              description: "Black handbag.",
              quantity: "1",
              price: "15",
              tax: "0.02",
              sku: "product34",
              currency: "USD",
            },
          ],
          shipping_address: {
            recipient_name: "Brian Robinson",
            line1: "4th Floor",
            line2: "Unit #34",
            city: "San Jose",
            country_code: "US",
            postal_code: "95131",
            phone: "011862212345678",
            state: "CA",
          },
        },
      },
    ],
    note_to_payer: "Contact us for any questions on your order.",
    redirect_urls: {
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
    },
  });

  // listar todos os detalhes dos pagamentos
  const response = await paypal.payments.showDetails();

  // pegar o pagamento especifico
  const response = await paypal.payments.showDetail("PAYMENT_ID");

  // atualizar o status de entrega de uma transação
  await paypal.shipping.trasckersBatch({
    trackers: [{ transaction_id: "77V700257E896184K", status: "DELIVERED" }],
  });
})();
```

## Módulos de pagamento disponíveis no momento

- PayPal [Documentação](https://developer.paypal.com/api/rest/)
- MercadoPago [Documentação](https://www.mercadopago.com.br/developers/pt/reference)
- PagSeguro (BREVE)
- PicPay (BREVE)
