import createItem from "./services/item.js"
import * as cartSerive from "./services/cart.js"

const myCart = []
const myWhishList = []

console.log("Welcome to the your car shopee")

const item1 = await createItem("Toy", 20.99, 1)
const item2 = await createItem("Toys", 39.99, 3)

await cartSerive.addItem(myCart, item1)
await cartSerive.addItem(myCart, item2)

await cartSerive.removeItem(myCart, item2)
await cartSerive.removeItem(myCart, item2)

await cartSerive.displaycart(myCart, item2)

//await cartSerive.deleteItem(myCart, item2.name)
//await cartSerive.deleteItem(myCart, item1.name)





console.log("Shopee Cart Total")
await cartSerive.calculateTotal(myCart)
