<p align="center">
  <img src="https://cdn.discordapp.com/attachments/551211620924260392/925198303598100580/cherry_code.png" width="240"/>
</p>

## Sobre a ferramenta

Ferramenta focado em auxiliar no desenvolvimento de web server tanto para client side quanto para server side, será constantemente atualizado conforme alguma ferramentas que são bastante utilizadas serem adicionado a essa framework.

**OBS:** Focado para meus trabalhos exclusivamente freelancer.

## Exemplo de inicialização

```
npm install eduardommelo/express-services
```

```js
const MethodsPayment = require("./src/Client");

const checkout = new MethodsPayment({
  methods: {
    // cada metodo de pagamento pode variar sua forma de configurar
    paypal: {
      token: "Token de autenticaçao", // token de auth
      sandbox: true, // ativar modo sandbox ou não
      redirect: {
        cancel: "url de redirect",
        accept: "url de redirect ",
      },
    },
  },
});

const paypal = checkout.add("paypal");

(async () => {
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
})();
```

## Módulos de pagamento disponíveis no momento

- Paypal
- MercadoPago (BREVE)
- PagSeguro (BREVE)
- PicPay (BREVE)
