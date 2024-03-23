import * as z from "zod"

const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

export const SignupValidation = z.object({
    fullName: z.string().min(2, { message: "Name should be atleast 2 characters" }),
    email: z.string().email(),
    password: z.string().refine((value) => passwordRegex.test(value), {
        message: 'Password must be at least 8 characters long and contain at least one digit, one alphabetic character, and one special character.',
    })
})
export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string(),
})