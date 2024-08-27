export interface ApiErrorInterface {
    error: {
        errors: Array<{
            field: string;
            message: string;
        }>;
    };
}