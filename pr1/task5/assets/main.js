const orders = [
    { orderId : "1112", customer : 
        {name : "Вікторія", email : "viktoria@gmail.com"}, 
        items : ["товар1", "товар2", "товар3", "товар4"], total : 1500 },
    {  orderId : "1113", customer : 
        {name : "Ірина", email : "iryna@gmail.com" }, 
        items : ["товар1", "товар2", "товар3"], total : 2500 },
    { orderId : "1114", customer : 
        {name : "Василь", email : "vasyl@gmail.com"}, 
        items : ["товар1"], total : 1130 },
    { orderId : "1115", customer : 
        {name : "Назар", email : "nazar@gmail.com"}, 
        items : ["товар1", "товар2", "товар3", "товар4", "товар5", "товар6", "товар7"], total : 15000 
    },
    { orderId : "1116", customer : 
        {name : "Вікторія", email : "viktoria@gmail.com"}, 
        items : ["товар1", "товар2", "товар3"], total : 1400 
    }
]

function getTotalSpentByCustomer(orders, customerName){
    return orders
    .filter(order => order.customer.name == customerName)
    .reduce((sum, order) => sum + order.total, 0)
}

const customerName = prompt("Введіть, будь ласка, ім'я (Вікторія, Ірина, Василь, Назар):")

alert(`Користувач/ка ${customerName} витратив/ла загалом: ${getTotalSpentByCustomer(orders, customerName)}`)


