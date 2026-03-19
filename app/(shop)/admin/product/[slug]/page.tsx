import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ProductAdminPage( { params }: Props ) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const categoriesResult = await getCategories();
    
    // Todo: new
    if( !product && slug !== "new") {
        redirect('/admin/products')
    }

    if ( !categoriesResult.ok ) {
        redirect('/admin/products');
    }

    const categories = categoriesResult.categories ?? [];
    
    
    const title = (slug === "new") ? "Nuevo Producto" : "Editar Producto";
    
    return (
        <>
            <Title title={`${title}`} />
            <ProductForm product={product ?? {}} categories={categories} />
        </>
    )
}
