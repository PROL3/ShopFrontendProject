import { z } from 'zod';

const UserSchema = z.object({
    age: z.number().int().positive(),
    name: z.string().max(15)
});

/**
 * Dynamically validates the object based on available fields.
 */
export const validUser = <T extends Partial<z.infer<typeof UserSchema>>>(obj: T): boolean => {
    try {
        // Extract keys that exist in both the object and the schema
        const schemaKeys = Object.keys(UserSchema.shape) as (keyof typeof UserSchema.shape)[];
        const existingKeys = schemaKeys.filter(key => key in obj);

        // Pick only existing keys from UserSchema
        const dynamicSchema = UserSchema.pick(
            existingKeys.reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<keyof typeof UserSchema.shape, true>)
        );

        // Validate using the dynamically selected schema
        dynamicSchema.parse(obj);
        return true;
    } catch (error) {
        throw new Error(
            `Validation failed: ${error instanceof z.ZodError ? error.errors.map(e => e.message).join(", ") : "Invalid data"}`
        );
    }
};



// export const userValidateSchema = <T extends Partial<z.infer<typeof UserSchema>>,>(obj: T) => dynamicValidateSchema(UserSchema, obj)
