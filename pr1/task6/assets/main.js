const products = [
    {productId : "1111", name : "товар1", price : 1500},
    {productId : "2111", name : "товар2", price : 100},
    {productId : "3111", name : "товар3", price : 400},
    {productId : "4111", name : "товар4", price : 850},
    {productId : "5111", name : "товар5", price: 1010},
    {productId : "6111", name : "товар6", price : 676767}
]

const purchases = [
    { purchaseId : "1111", productId : "1111", quantity : 9 },
    { purchaseId : "2111", productId : "1112", quantity : 7 },
    { purchaseId : "3111", productId : "1113", quantity : 6 },
    { purchaseId : "4111", productId : "1114", quantity : 4 },
    { purchaseId : "5111", productId : "1115", quantity : 3 },
    { purchaseId : "6111", productId : "1116", quantity : 2 }
]

function getTotalSales(products, purchases) {
    return purchases.reduce((result, purchase) => {
        let product = products.find(p => p.productId == purchase.productId)
        if (product){
            let revenue = product.price * purchase.quantity
            result[product.name] = (result[product.name] || 0) + revenue
        }
        return result
    }, {})
}

console.log(getTotalSales(products, purchases))