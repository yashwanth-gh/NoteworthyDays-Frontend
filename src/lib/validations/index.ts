import * as z from "zod"

const passwordRegex = /^(?=.*[A-Za-z0-9@#%$])[A-Za-z0-9@#%$]{8,}$/;

export const SignupValidation = z.object({
    fullname: z.string().min(2, { message: "Name should be atleast 2 characters" }),
    email: z.string().email(),
    password: z.string().refine((value) => passwordRegex.test(value), {
        message: 'Password must be at least 8 characters and include only numbers, alphabets, and @#%$.',
    })
})
export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string(),
})