import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import UserForm from "@/components/UserForm";

export default async function Login() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }
    
    return <UserForm name = {session.user!.name}/>

}