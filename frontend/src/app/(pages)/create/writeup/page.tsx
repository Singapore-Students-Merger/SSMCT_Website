import CreateWriteupPage from "@/components/CreateWriteupPage";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function createPage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }

    return <CreateWriteupPage/>;
}
