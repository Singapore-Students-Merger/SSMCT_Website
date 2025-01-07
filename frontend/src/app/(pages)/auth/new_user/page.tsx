import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import UserForm from "@/components/UserForm";
import Category from '@/types/category';
export default async function Login() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }
    const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        .then((res) => res.json())
        .catch((err) => {
            console.error('Error:', err);
            return [];
        });
    return <UserForm name = {session.user!.name} categories = {categories}/>

}