export const chatSchema = {
    body: {
        trim: true,
        exists: {
            errorMessage: "body is required"
        },
        isLength: {
            options: {
                min: 1,
                max: 500
            },
            errorMessage: "body content must be betwee 1-500 characters"
        }
    }
}