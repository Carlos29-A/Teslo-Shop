import { auth } from "@/auth"
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  
    const session = await auth();

    if(! session?.user ) {
        redirect("/")
    }
  
    return (
        <div>
            <Title 
                title="Perfil"
                subtitle="Mi perfil"
            />
            <pre>
                { JSON.stringify(session.user, null, 2) }
            </pre>
        </div>
    )
}
