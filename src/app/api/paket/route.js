import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.paket.findMany({
        orderBy: { id: 'asc' },
    });

    const viewData = data.map((item) => ({
        id: item.id,
        kode: item.kode,
        nama: item.nama,
        deskripsi: item.deskripsi
        /*order_date: item.order_date.toISOString().split('T')[0],
        order_by: item.order_by,
        selected_package: item.selected_package,
        qty: item.qty,
        status: item.is_paid ? "Lunas" : "Belum Lunas",*/
    }));

    return new Response(JSON.stringify(viewData), { status: 200 });
}

export async function POST(request) {
    const { kode, nama, deskripsi } = await request.json();
    
    if (!kode || !nama || !deskripsi) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    /*const newOrderDate = new Date(order_date).toISOString();

    const is_paid = status === "Lunas";*/

    const paket = await prisma.paket.create({
        data: { kode, nama, deskripsi },
    });
    
    /*paket.order_date = paket.order_date.toISOString().split('T')[0];
    paket.status = is_paid ? "Lunas" : "Belum Lunas";
    delete paket.is_paid;*/

    return new Response(JSON.stringify(paket), { status: 201 });
}