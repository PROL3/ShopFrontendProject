import { Product } from "../stub/basket.stub";
import { ONE_MONTH } from "../utils/constans";
import { RedisConnection } from "../utils/redisConnection";

export class BasketRepository {
    private static instance: BasketRepository;
    private redisClient: RedisConnection;
    private constructor() {
        this.redisClient = RedisConnection.getInstance();
    }

    static getInstance(): BasketRepository {
        if (!BasketRepository.instance) {
            BasketRepository.instance = new BasketRepository();
        }
        return BasketRepository.instance;
    }

    async getBasket(): Promise<Product[]> {
        const basket = await this.redisClient.getClient().GET('basket');
        return basket ? JSON.parse(basket) : [];
    }

    private async editBasket(basket: Product[]): Promise<void> {
        // after 1 month, the basket will be deleted from redis if no change 
        await this.redisClient.getClient().SETEX('basket', ONE_MONTH, JSON.stringify(basket));
    }

    async addItem(item: Product): Promise<void> {
        const basket = await this.getBasket();
        const index = basket.findIndex(i => i.id === item.id);
        if (index !== -1) {
            basket[index].quantity += item.quantity;
        } else {
            basket.push(item);
        }
        await this.editBasket(basket);
    }

    async deleteItem(id: number): Promise<boolean> {
        const basket = await this.getBasket();
        const index = basket.findIndex(i => i.id === id);
        if (index !== -1) {
            basket.splice(index, 1);
            await this.editBasket(basket);
            return true;
        }
        return false;
    }

    async editItem(id: number, { quantityDelta }: { quantityDelta: number }): Promise<void> {
        const basket = await this.getBasket();
        const index = basket.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('המוצר לא נמצא בסל');
        }
        const updatedQuantity = basket[index].quantity + quantityDelta;
        if (updatedQuantity <= 0) {
            basket.splice(index, 1); // הסר את המוצר מהסל
        } else {
            basket[index].quantity = updatedQuantity;
        }

        await this.editBasket(basket);
    }
}

// Export the singleton instance getter

export const getBasketRepository = BasketRepository.getInstance;
