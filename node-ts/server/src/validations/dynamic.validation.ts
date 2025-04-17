import z from 'zod';

/**
 * Dynamically validates an object based on the provided schema.
 */
export const dynamicValidateSchema = <T extends z.ZodObject<any>>(
    schema: T,
    obj: Partial<z.infer<T>>
): boolean => {
    try {
        // Extract keys that exist in both the object and the schema
        const schemaKeys = Object.keys(schema.shape) as (keyof typeof schema.shape)[];
        const existingKeys = schemaKeys.filter(key => key in obj);

        // Pick only existing keys from the given schema
        const dynamicSchema = schema.pick(
            existingKeys.reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<keyof typeof schema.shape, true>)
        );

        // Validate using the dynamically selected schema
        dynamicSchema.parse(obj);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(
                JSON.stringify(
                    {
                        message: "Validation failed",
                        errors: error.errors.map(err => ({
                            path: err.path.join("."),
                            message: err.message
                        }))
                    },
                    null,
                    2
                )
            );
        }

        throw new Error("Invalid data");
    }
};
