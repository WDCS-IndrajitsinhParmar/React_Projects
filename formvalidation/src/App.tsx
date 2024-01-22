import "./App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// type formData = {
//   name: string;
//   email: string;
//   age: number;
//   password: string;
//   confirmPassword: string;
// };

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Too short" })
      .max(30, { message: "Too long" })
      .refine((val) => val.trim() !== "", { message: "Name is required" }),
    email: z
      .string()
      .email()
      .refine((val) => val.trim() !== "", { message: "Email is required" }),
    age: z
      .number({invalid_type_error:"Invalid"})
      .gt(18, { message: "Too young" })
      .lt(70, { message: "Too old" })
      .refine((val) => val !== undefined && val !== null, { message: "Age is required" })
      ,
    password: z
      .string()
      .min(5, { message: "Too short" })
      .max(20, { message: "Too long" })
      ,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password must be matched",
    path: ["confirmPassword"],
  });

  type formData  = z.infer<typeof schema>
  
  function App() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<formData>({ resolver: zodResolver(schema) });
    
    const submit = (data:formData) => {
      console.log("data", data);
      reset();
    };
    console.log(errors)
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submit)} className="form">
        <div className="inputs">
          <label>Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="inputs">
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="inputs">
          <label>Age:</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div className="inputs">
          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="inputs">
          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
