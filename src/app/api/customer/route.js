import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.customer.findMany({
        orderBy: { id: 'asc' },
    });

    const viewData = data.map((item) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        createdAt: item.createdAt.toISOString().split('T')[0],
        /*order_by: item.order_by,
        selected_package: item.selected_package,
        qty: item.qty,
        status: item.is_paid ? "Lunas" : "Belum Lunas",*/
    }));

    return new Response(JSON.stringify(viewData), { status: 200 });
}

export async function POST(request) {
    const { name, phone, email } = await request.json();
    
    if ( !name || !phone ) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    /*const newCreatedAt = new Date(createdAt).toISOString();

    /*const is_paid = status === "Lunas";*/

    const customer = await prisma.customer.create({
        data: { name, phone, email },
    });
    
    customer.createdAt = customer.createdAt.toISOString().split('T')[0];
    /*preorder.status = is_paid ? "Lunas" : "Belum Lunas";
    delete preorder.is_paid;*/

    return new Response(JSON.stringify(customer), { status: 201 });
}