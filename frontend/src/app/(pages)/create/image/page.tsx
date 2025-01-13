import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import CreateImagesPage from "@/components/CreateImagePage";

export default async function createPage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }

    return <CreateImagesPage/>;
}
