import {IIngredient, IOrders} from "./types";


export const finalPrice = (ingredients: Array<IIngredient>) => {
    let price = 0
    ingredients.forEach((e: any) => {
        if (e.type === 'bun') {
            price += (2 * e.price)
        } else {
            price += e.price
        }
    })
    return price
}

export const fullArray = (orders: Array<IOrders>, data: Array<IIngredient>) => {
    let ingred: any = []
    const ordersArray: any = []
    orders.forEach(o => {
        o.ingredients.forEach(i => {
            ingred.push(data.filter((e) => e._id === i)[0])
        })
        ordersArray.push({
            ...o,
            ingredients: ingred,
        })
        ingred = []
    })
    return ordersArray
}