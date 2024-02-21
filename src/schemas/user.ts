export const UserSchema = {
    email: {
        trim: true,
        isEmail: {
            errorMessage: 'Invalid email'
        }
    },
    password: {
        isLength: {
            options: {
                min: 8
            },
            errorMessage: 'Password must be at least 8 characters'
        }
    }
}