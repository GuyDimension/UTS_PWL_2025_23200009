import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.preorder.findMany({
        include: { paket: true, customer: true },
        orderBy: { id: 'asc' },
    });

    const viewData = data.map((item) => ({
        id: item.id,
        order_date: item.order_date.toISOString().split('T')[0],
        order_by: item.order_by,
        selected_package: item.selected_package,
        qty: item.qty,
        status: item.is_paid ? "Lunas" : "Belum Lunas",
    }));

    return new Response(JSON.stringify(viewData), { status: 200 });
}

export async function POST(request) {
    const { order_date, order_by, selected_package, qty, status } = await request.json();
    
    if (!order_date || !order_by || !selected_package || !qty || !status) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), 
        {status: 400});
    }

    const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";

    const selectedPackageInt = parseInt(selected_package, 10);
    if (isNaN(selectedPackageInt)) {
        return new Response(JSON.stringify({ error: 'selected_package harus dalam bentuk angka yang valid' }), 
        {status: 400});
    }

    const orderByInt = parseInt(order_by, 10);
    if (isNaN(orderByInt)) {
        return new Response(JSON.stringify({ error: 'order_by harus dalam bentuk angka yang valid' }),
        {status: 400});
    }
    // const orderByInt = parseInt(order_by, 10);
    // if (isNaN(orderByInt)) {
    //     return new Response(JSON.stringify({ error: 'order_by tidak valid'}),
    //     {status: 400});
    // }

    const preorder = await prisma.preorder.create({
        data: { order_date: newOrderDate, order_by: orderByInt, selected_package: selectedPackageInt, qty: parseInt(qty), is_paid },
    });
    
    const newPreorder = {
        id: preorder.id,
        order_date: preorder.order_date.toISOString().split('T')[0],
        order_by: preorder.order_by,
        selected_package: preorder.selected_package,
        qty: preorder.qty,
        status: is_paid ? "Lunas" : "Belum Lunas"
    };

    // preorder.order_date = preorder.order_date.toISOString().split('T')[0];
    // preorder.status = is_paid ? "Lunas" : "Belum Lunas";
    // delete preorder.is_paid;

    return new Response(JSON.stringify(newPreorder), { status: 201 });
}