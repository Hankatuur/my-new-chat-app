import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link,useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/Validations"
import { Loader } from "lucide-react"
import {  useSigInAccount } from "@/lib/react-queires/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"





const SigninForm= () => {

  const { toast } = useToast()
  const {checkAuthUser,isLoading:isUserLoading} = useUserContext();
  const navigate = useNavigate();
  // Queries


  const {mutateAsync : SigInAccount} = useSigInAccount();

    
    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
      resolver: zodResolver(SigninValidation),
      defaultValues: {
       
        email:'',
        password:'',
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninValidation>) {
      // create new user
      const session = await SigInAccount ({
      email: values.email,
      password: values.password,

     })
     if(!session) {
        return toast({
        title: "Sign up Failed .Please Try again"});
       
       
     }
      const isLoggedIn = await checkAuthUser();
     

      if(!isLoggedIn){
        form.reset()
       navigate('/')
      }
      else{
         toast({title:'Logged In failed.Please Try Again!'})
         return;
      } 
   
      

    }
  
  return (
    
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
       <img src="./assets/imges/logo.png" alt="logo-img" />
       <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log In </h2>
       <p className="text-light-3 small-medium md:base-regular mt-2">
        Welcome To Snap-Gram Please Enter Your Details!</p>
        
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5 w-full mt-4">
       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
             <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? (
            <div className="flex-center gap-2">
               < Loader/>Loading...
            </div>
          ):"Sign in"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
           Don't Have Account?
           <Link to="/sign-up" 
           className="text-primary-500 text-small-semibold ml-1">Sign Up</Link>
          </p>
      </form>
      </div>
    </Form>
 
  )
}

export default SigninForm







// const SigninForm = () => {
//   return (
//     <div>signinForm</div>
//   )
// }

// export default SigninForm