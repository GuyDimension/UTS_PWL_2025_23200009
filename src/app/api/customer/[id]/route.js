import prisma from "@/lib/prisma";

export async function PUT(request, {params}) {
    const { id } = params;
    const { name, phone, email, createdAt } = await request.json();

    if (!name || !phone || !email || !createdAt ) {
       return new Response(JSON.stringify({ error: 'Field kosong'}), {status: 400});
    }

    const newCreatedAt = new Date(createdAt).toISOString();

    /*const is_paid = status === "Lunas";*/

    const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, phone, email, createdAt: newCreatedAt },
    });

    const viewCustomer = {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        createdAt: customer.createdAt.toISOString().split('T')[0]
        /*order_by: preorder.order_by,
        selected_package: preorder.selected_package,
        qty: preorder.qty,
        status: preorder.is_paid ? "Lunas" : "Belum Lunas"*/
    };

    return new Response(JSON.stringify(viewCustomer), { status: 200 }); 
}

export async function DELETE(request, {params}) {
    const { id } = params;
    
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), 
        { status: 400 });

    const deletedCustomer = await prisma.customer.delete({
        where: { id: Number(id) },
    });
        
    return new Response(JSON.stringify({ message: "Berhasil dihapus"}), 
        { status: 200 });
}