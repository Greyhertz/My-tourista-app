// // utils/validateForm.ts
// export type FormErrors<T> = Partial<Record<keyof T, string>>;

// type ValidationOptions<T> = {
//   required?: (keyof T)[];
//   name?: (keyof T)[]; // ✅ added
//   email?: (keyof T)[];
//   phone?: (keyof T)[];
//   minLength?: { field: keyof T; length: number }[];
//   match?: { field: keyof T; matchWith: keyof T; message?: string }[];
//   password?: {
//     field: keyof T;
//     minLength?: number;
//     requireUppercase?: boolean;
//     requireNumber?: boolean;
//     requireSpecialChar?: boolean;
//   }[];
//   custom?: {
//     field: keyof T;
//     validate: (value: any, formData: T) => string | undefined;
//   }[];
// };

// // ✅ Full form validation
// export function validateForm<T extends Record<string, any>>(
//   formData: T,
//   options: ValidationOptions<T>
// ): FormErrors<T> {
//   const errors: FormErrors<T> = {};

//   // Required
//   options.required?.forEach(field => {
//     if (!formData[field] || String(formData[field]).trim() === '') {
//       errors[field] = `${String(field)} is required`;
//     }
//   });

//   // Name
//   const nameRegex = /^[A-Za-z\s]+$/;
//   options.name?.forEach(field => {
//     const value = formData[field];
//     if (value && !nameRegex.test(String(value))) {
//       errors[field] = `${String(field)} must contain only letters and spaces`;
//     }
//   });

//   // Email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   options.email?.forEach(field => {
//     const value = formData[field];
//     if (value && !emailRegex.test(String(value))) {
//       errors[field] = 'Invalid email address';
//     }
//   });

//   // Phone
//   const phoneRegex = /^\+?[0-9]{7,15}$/;
//   options.phone?.forEach(field => {
//     const value = formData[field];
//     if (value && !phoneRegex.test(String(value))) {
//       errors[field] = 'Invalid phone number';
//     }
//   });

//   // Min length
//   options.minLength?.forEach(({ field, length }) => {
//     const value = String(formData[field] ?? '');
//     if (value && value.length < length) {
//       errors[field] = `${String(field)} must be at least ${length} characters`;
//     }
//   });

//   // Password strength rules
//   options.password?.forEach(
//     ({
//       field,
//       minLength = 8,
//       requireUppercase = true,
//       requireNumber = true,
//       requireSpecialChar = true,
//     }) => {
//       const value = String(formData[field] ?? '');
//       if (!value) return;

//       if (value.length < minLength) {
//         errors[field] = `Password must be at least ${minLength} characters`;
//       } else if (requireUppercase && !/[A-Z]/.test(value)) {
//         errors[field] = 'Password must include at least one uppercase letter';
//       } else if (requireNumber && !/[0-9]/.test(value)) {
//         errors[field] = 'Password must include at least one number';
//       } else if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
//         errors[field] = 'Password must include at least one special character';
//       }
//     }
//   );

//   // Match fields (e.g. password + confirmPassword)
//   options.match?.forEach(({ field, matchWith, message }) => {
//     if (formData[field] !== formData[matchWith]) {
//       errors[field] =
//         message || `${String(field)} must match ${String(matchWith)}`;
//     }
//   });

//   // Custom rules
//   options.custom?.forEach(({ field, validate }) => {
//     const error = validate(formData[field], formData);
//     if (error) errors[field] = error;
//   });

//   return errors;
// }

// // ✅ Single field validation (real-time)
// export function validateField<T extends Record<string, any>>(
//   field: keyof T,
//   value: any,
//   formData: T,
//   options: ValidationOptions<T>
// ): string | undefined {
//   // Required
//   if (options.required?.includes(field) && !value) {
//     return `${String(field)} is required`;
//   }

//   // const validateField = (name: string, value: string) => {
//   //   let error = '';

//   //   if (name === 'name') {
//       // if (!value.trim()) error = 'Please enter your full name';
//       // else if (value.length < 3) error = 'Name must be at least 3 characters';
//   //     // else if
//   //     else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Name does not include symbols';
//   //     else if (/^[0-9]+$/.test(value)) error = 'name does not include numbers'
//   //   }
//   //   if (name === 'email') {
//   //     if (!value.trim()) error = 'Please enter your email';
//   //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//   //       error = 'Enter a valid email address';
//   //   }

//   //   if (name === 'phone') {
//   //     if (!value.trim()) error = 'Please enter your phone number';
//   //     else if (!/^\+?[0-9]{7,15}$/.test(value))
//   //       error = 'Enter a valid phone number';
//   //   }

//   //   if (name === 'password') {
//   //     if (!value.trim()) error = 'Please enter a password';
//   //     else if (value.length < 8)
//   //       error = 'Password must be at least 8 characters';
//   //     else if (!/[A-Z]/.test(value))
//   //       error = 'Password must include an uppercase letter';
//   //     else if (!/[0-9]/.test(value)) error = 'Password must include a number';
//   //     else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
//   //       error = 'Password must include a special character';
//   //   }

//   //   if (name === 'confirmPassword') {
//   //     if (!value.trim()) error = 'Please confirm your password';
//   //     else if (value !== formData.password) error = 'Passwords do not match';
//   //   }

//   //   return error;
//   // }

//   // Name
//   if (options.name?.includes(field))
//   {
//     if (!value.trim()) `${String(field)}Please enter your full name`;
//     else if (value.length < 3) `${String(field)}Name must be at least 3 characters`;
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (value && !nameRegex.test(String(value))) {
//       return `${String(field)} must contain only letters and spaces`;
//     }
//   }

//   // Email
//   if (options.email?.includes(field)) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (value && !emailRegex.test(String(value))) {
//       return 'Invalid email address';
//     }
//   }

//   // Phone
//   if (options.phone?.includes(field)) {
//     const phoneRegex = /^\+?[0-9]{7,15}$/;
//     if (value && !phoneRegex.test(String(value))) {
//       return 'Invalid phone number';
//     }
//   }

//   // Min length
//   const minRule = options.minLength?.find(r => r.field === field);
//   if (minRule && value.length < minRule.length) {
//     return `${String(field)} must be at least ${minRule.length} characters`;
//   }

//   // Password strength
//   const passRule = options.password?.find(r => r.field === field);
//   if (passRule) {
//     const {
//       minLength = 8,
//       requireUppercase = true,
//       requireNumber = true,
//       requireSpecialChar = true,
//     } = passRule;
//     if (value.length < minLength) {
//       return `Password must be at least ${minLength} characters`;
//     }
//     if (requireUppercase && !/[A-Z]/.test(value)) {
//       return 'Password must include at least one uppercase letter';
//     }
//     if (requireNumber && !/[0-9]/.test(value)) {
//       return 'Password must include at least one number';
//     }
//     if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
//       return 'Password must include at least one special character';
//     }
//   }

//   // Match fields
//   const matchRule = options.match?.find(r => r.field === field);
//   if (matchRule && value !== formData[matchRule.matchWith]) {
//     return (
//       matchRule.message ||
//       `${String(field)} must match ${String(matchRule.matchWith)}`
//     );
//   }

//   // Custom rule
//   const customRule = options.custom?.find(r => r.field === field);
//   if (customRule) {
//     return customRule.validate(value, formData);
//   }

//   return undefined;
// }

import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include an uppercase letter')
      .regex(/[0-9]/, 'Password must include a number')
      .regex(
        /[!@#$%^&*(),.?\":{}|<>]/,
        'Password must include a special character'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
