import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, {
    message: 'Password is  Required',
  }),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Full Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, {
    message: 'Password is  Required',
  }),
})
export const ProfileUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Full Name is required' }),
})
export const PasswordUpdateSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old Password is required' }),
  newPassword: z.string().min(1, { message: 'New Password is required' }),
  confirmPassword: z.string().min(1, { message: 'New Password is required' }),
})

export const ProductSchema = z.object({
  _id: z.string().optional(),
  images: z.array(z.string()).min(1, { message: 'Images are required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  productName: z.string().min(1, { message: 'Product name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.coerce.number().min(1, { message: 'Old Password is required' }),
  discount: z.coerce.number().min(1, { message: 'Discount is required' }),
  quantity: z.coerce.number().min(1, { message: 'Quantity is required' }),
})
