import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.preorder.findMany({
        orderBy: { id: 'asc' },
    });

    const formattedData = data.map((item) => ({
        id: item.id,
        order_date: item.order_date.toISOString().split('T')[0],
        order_by: item.order_by,
        selected_package: item.selected_package,
        qty: item.qty,
        status: item.is_paid ? "Lunas" : "Belum Lunas",
    }));

    return new Response(JSON.stringify(formattedData), { status: 200 });
}

export async function POST(request) {
    const { order_date, order_by, selected_package, qty } = await request.json();
    
    if (!order_date || !order_by || !selected_package || !qty || !status) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";

    const preoder = await prisma.preorder.create({
        data: { order_date: newOrderDate, order_by, selected_package, qty: parseInt(qty), is_paid },
    });
    
    preoder.order_date = preoder.order_date.toISOString().split('T')[0];
    preoder.status = is_paid ? "Lunas" : "Belum Lunas";
    delete preoder.is_paid;

    return new Response(JSON.stringify(preorder), { status: 201 });
}

export async function PUT(request, {params}) {
    const { id } = params;
    const { order_date, order_by, selected_package, qty, status } = await request.json();

    if (!order_date || !order_by || !selected_package || !qty || !status ) {
       return new Response(JSON.stringify({ error: 'Field tidak terisi'}), {status: 400});
    }
    const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";

    const preorder = await prisma.preorder.update({
        where: { id },
        data: { order_date: newOrderDate, order_by, selected_package, qty, is_paid },
    });

    const formattedData = {
        id: preorder.id,
        order_date: preorder.order_date.toISOString().split('T')[0],
        order_by: preorder.order_by,
        selected_package: preorder.selected_package,
        qty: preorder.qty,
        status: preorder.is_paid ? "Lunas" : "Belum Lunas"
    };

    return new Response(JSON.stringify(formattedData), { status: 200 }); 
}

export async function DELETE(request, {params}) {
    const { id } = params;
    
    if (!id) return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), 
        { status: 400 });

    const deletedPreorder = await prisma.preorder.delete({
        where: { id: Number(id)},
    });
        
    return new Response(JSON.stringify({ message: "Berhasil dihapus"}), 
        { status: 200 });
}