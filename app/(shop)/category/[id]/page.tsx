import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}



export default async function CategoryPageForId({ params }: Props) {
  
  const { id } = await params;
  

  if ( id === "kids") {
    notFound();
  }
  return (
    <div>Category Page For Id: { id }</div>
  )
}
