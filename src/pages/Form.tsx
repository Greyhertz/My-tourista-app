// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import z from 'zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// // Define the schema using Zod
// const formSchema = z.object({
//   firstName: z
//     .string()
//     .min(2, { message: 'First name must be at least 2 characters' })
//     .regex(/^[A-Za-z\s]+$/, { message: 'Only letters and spaces are allowed' }),
//   lastName: z
//     .string()
//     .min(2, { message: 'Last name must be at least 2 characters' })
//     .regex(/^[A-Za-z\s]+$/, { message: 'Only letters and spaces are allowed' }),
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z
//     .string()
//     .min(8, { message: 'Password must be at least 8 characters long' })
//     .regex(/(?=.*[a-z])/, {
//       message: 'Password must include at least one lowercase letter',
//     })
//     .regex(/(?=.*[A-Z])/, {
//       message: 'Password must include at least one uppercase letter',
//     })
//     .regex(/(?=.*\d)/, { message: 'Password must include at least one number' })
//     .regex(/(?=.*[!@#$%^&*])/, {
//       message: 'Password must include at least one special character',
//     }),
// });

// type FormField = z.infer<typeof formSchema>;

// console.log(formSchema.shape.firstName);
// // type fromField = {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   password: string;
// // };
// export function MyForm() {
//   const {
//     register,
//     handleSubmit,
//     // setError,
//     formState: { errors, isSubmitting },
//   } = useForm<FormField>({
//     defaultValues: { firstName: '', lastName: '', email: '', password: '' },
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit: SubmitHandler<FormField> = async (data: unknown) =>
//     // const onSubmit = async (data: unknown) =>
//     {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         // throw new Error('Something went wrong'); // Simulate an error for demonstration
//         // Simulate form submission
//         // Replace this with your actual form submission logic
//         // For example, you might send the data to an API endpoint
//         // using fetch or axios.
//         // Here's a simple example using fetch:
//         // await fetch('/api/submit', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify(data),
//         // });

//         // submitData(data); // Uncomment and implement if needed
//         console.log(data);
//       } catch (error) {
//         console.error('Form submission error:', error);
//         // setError('root', {
//         //   type: 'manual',
//         //   message: 'Submission failed. Please try again.',
//         // });
//       }
//     };
//   return (
//     <div className="min-h-screen bg-gradient-to-br py-10 gap-5 flex flex-col items-center justify-start">
//       <form onSubmit={handleSubmit(onSubmit)} className="gap-10 flex flex-col ">
//         <Input {...register('firstName')} />

//         {errors.firstName && (
//           <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//         )}
//         <Input {...register('lastName')} />
//         {errors.lastName && (
//           <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//         )}

//         <Input {...register('email')} />
//         {errors.email && (
//           <p className="text-red-500 text-sm">{errors.email.message}</p>
//         )}

//         <Input type="password" {...register('password')} />
//         {/* ✅ This is where you must render the error */}
//         {errors.password && (
//           <p className="text-red-500 text-sm">{errors.password.message}</p>
//         )}

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit'}
//         </Button>

//         {/* {errors.root && (
//           <p className="text-red-500 text-sm">{errors.root.message}</p>
//         )} */}
//       </form>
//     </div>
//   );
// }
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
// import { Button } from "@/components/ui/button";
// export const MyForm = () =>
// {
//   const form = useForm();
//   const { register, control } = form
//   const { ref, onBlur, onChange, name } = register("username");

//   type FormValues = {
//     email: '',
//     channel: '',
//   }
//   const onSubmit = (p: FormValues) =>
//   {
//     console.log(p)
//   }
//   return (
//     <div>
//       <form>
//         <Label htmlFor="username">Username</Label>
//         <Input
//           type="text"
//           id="username"
//           {...register('username')}
//           ref={ref}
//           onChange={onChange}
//           onBlur={onBlur}
//         />

//         <Label htmlFor="email">Email</Label>
//         <Input
//           type="text"
//           id="email"
//           {...register('email')}
//           ref={ref}
//           onChange={onChange}
//           onBlur={onBlur}
//         />

//         <Label htmlFor="channel">Channel</Label>
//         <Input
//           type="text"
//           id="Channel"
//           {...register('channel')}
//           ref={ref}
//           onChange={onChange}
//           onBlur={onBlur}
//         />
//         <Button>Submit</Button>
//       </form>
//       <DevTool control={control} />
//     </div>
//   );
// };

import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ✅ Define the schema using Zod
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Only letters and spaces are allowed' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Only letters and spaces are allowed' }),

  email: z.string().email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/(?=.*[a-z])/, {
      message: 'Password must include at least one lowercase letter',
    })
    .regex(/(?=.*[A-Z])/, {
      message: 'Password must include at least one uppercase letter',
    })
    .regex(/(?=.*\d)/, { message: 'Password must include at least one number' })
    .regex(/(?=.*[!@#$%^&*])/, {
      message: 'Password must include at least one special character',
    }),
});

type FormField = z.infer<typeof formSchema>;

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
    resolver: zodResolver(formSchema),
  });
  
  const onubmit = async (data: FormField) => {};
  async function onsubmit(data: FormField)
  {
    
  }
  const onSubmit: SubmitHandler<FormField> = async data => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
      console.log('Form data:', data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 gap-5 flex flex-col items-center justify-start">
      <form onSubmit={handleSubmit(onSubmit)} className="gap-10 flex flex-col">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" {...register('password')} />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
