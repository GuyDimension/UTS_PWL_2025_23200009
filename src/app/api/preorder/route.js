import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.preorder.findMany({
    orderBy: { id: 'asc' },
    });

return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { order_date, order_by, selected_package, qty } = await request.json();
    if (!order_date || !order_by || !selected_package || !qty) {
    return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
    status: 400,
    });
    }
    const preoder = await prisma.preorder.create({
    data: { kode, nama },
    });
    return new Response(JSON.stringify(preorder), { status: 201 });
}

export async function PUT(request) {
    const { order_date, order_by, selected_package, qty } = await request.json();
    if (!id || !order_date || !order_by || !selected_package || !qty ) return Response.json({ error: 'Field kosong'}
        , { status: 400 });

    const preorder = await prisma.preorder.update({
        where: { id },
        data: { kode, nama },
    });

    return Response.json(preoder); 
    }

    export async function DELETE(request) {
        const { id } = await request.json();
        if (!id) return Response.json({ error: 'ID tidak ditemukan' }
            , { status: 400 });
        
        await prisma.preoder.delete({ where: { id } });
        return Response.json({ message: 'Berhasil dihapus' });
    }