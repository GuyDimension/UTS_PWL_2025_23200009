import prisma from "@/lib/prisma";

export async function PUT(request, {params}) {
    const { id } = params;
    const { name, phone, email } = await request.json();

    if (!name || !phone) {
       return new Response(JSON.stringify({ error: 'Field kosong'}), {status: 400});
    }

    /*const is_paid = status === "Lunas";*/

    const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, phone, email },
    });
    return new Response(JSON.stringify(customer), { status: 200 }); 
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