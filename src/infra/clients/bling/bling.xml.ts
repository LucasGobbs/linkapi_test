
export const xmlPedido = (nome: string, id: string, value: string): string => {
  return encodeURI(`
  <?xml version="1.0" encoding="UTF-8"?>
  <pedido>
  <cliente>
  <nome>${nome}</nome>
  </cliente>
  <itens>
  <item>
  <codigo>001</codigo>
  <descricao>Testando</descricao>
  <un>Pç</un>
  <qtde>1</qtde>
  <vlr_unit>${value}</vlr_unit>
  </item>
  </itens>
  <parcelas>
  <parcela> 
  <vlr>${value}</vlr>
  </parcela>
  </parcelas>
  </pedido>`)
}
