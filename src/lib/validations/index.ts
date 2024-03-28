import * as z from "zod"

const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

export const SignupValidation = z.object({
    fullName: z.string().min(2, { message: "Name should be atleast 2 characters" }),
    email: z.string().email(),
    password: z.string().refine((value) => passwordRegex.test(value), {
        message: 'Password must be 8+ characters with a digit, letter, and special character.',
    })
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const EmailValidation = z.object({
    email: z.string().email(),
})

export const resetPasswordValidation = z.object({
    newPassword: z.string().refine((value) => passwordRegex.test(value), {
        message: 'Password must be 8+ characters with a digit, letter, and special character.',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
