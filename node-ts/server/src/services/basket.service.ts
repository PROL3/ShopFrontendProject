import { getBasketRepository } from "../repositories/basket.repository";
import { Product } from "../stub/basket.stub";

const getBasket = async (): Promise<Product[]> => {
    try {
        const basketRepository = getBasketRepository();
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const addItem = async (item: Product) => {
    try {
        const basketRepository = getBasketRepository();
        await basketRepository.addItem(item);
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const deleteItem = async (id: number) => {
    try {
        const basketRepository = getBasketRepository();
        const isDeleted = await basketRepository.deleteItem(id);
        if (!isDeleted) {
            throw new Error('Item not found');
        }
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}
const editItem = async (id: number, quantityDelta: Product) => {
    try {
        const basketRepository = getBasketRepository();
        await basketRepository.editItem(id, quantityDelta);
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { getBasket, addItem, deleteItem, editItem }