import { auth } from "@/auth"
import { redirect } from 'next/navigation'
import CreateWriteupsPage from "@/components/CreateWriteupPage";

export const dynamic = "force-dynamic"

export default async function createPage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/signin");
    }

    return <CreateWriteupsPage />;
}
