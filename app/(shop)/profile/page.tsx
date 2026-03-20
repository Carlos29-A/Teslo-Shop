import { auth } from "@/auth"
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ui/ProfileForm";

export default async function ProfilePage() {
  
    const session = await auth();

    if(! session?.user ) {
        redirect("/")
    }
    console.log({session: session.user});
  
    return (
        <div>
            <Title 
                title="Perfil"
                subtitle="Mi perfil"
            />
            <div className="w-[1000px] mx-auto mt-10 ">
                <ProfileForm imageUrl={session.user.image!} name={session.user.name!} email={session.user.email!}/>
            </div>
        </div>
    )
}
