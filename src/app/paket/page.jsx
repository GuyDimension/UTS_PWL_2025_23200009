"use client";
import styles from './PaketPage.module.css';
import { useEffect, useState } from 'react';

export default function PaketPage() {

  const [formVisible, setFormVisible] = useState(false);
  const [pakets, setPakets] = useState([]);
  const [kode, setKode ] = useState('');
  const [nama, setNama ] = useState('');
  const [deskripsi, setDeskripsi ]= useState('');
  /*const [qty, setQty ] = useState('');
  const [status, setStatus ] = useState('');*/
  const [msg, setMsg ] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchPakets = async () => {
    const res = await fetch('/api/paket');
    const data = await res.json();
    setPakets(data);
    };

    useEffect(() => {
        fetchPakets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/paket/${editId}` : '/api/paket';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kode, nama, deskripsi }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan');
            setKode('');
            setNama('');
            setDeskripsi('');
            /*setQty('');
            setStatus('');*/
            setEditId(null);
            setFormVisible(false);
            fetchPakets(); // refresh data
        } else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setKode(item.kode);
        setNama(item.nama);
        setDeskripsi(item.deskripsi);
        /*setQty(item.qty);
        setStatus(item.status === "Lunas" ? "Lunas" : "Belum Lunas");*/
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;

        await fetch(`/api/paket/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        fetchPakets();
    };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ayam Penyet Koh Eddy</h1>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input Data Baru</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Kode</span>
                    <input
                    type="text"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    placeholder="Masukkan Kode Paket"
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Nama</span>
                    <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama Paket"
                    required
                    />
                </div>
                {/* <div className={styles.formGroup}>
                    <span>Paket</span>
                    <select 
                        value={selected_package}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        required
                    >
                        <option value="">Pilih Paket</option>
                        <option value="Paket 1">Paket 1</option>
                        <option value="Paket 2">Paket 2</option>
                        <option value="Paket 3">Paket 3</option>
                        <option value="Paket 4">Paket 4</option>
                        <option value="Paket 5">Paket 5</option>
                    </select>
                </div> */}
                <div className={styles.formGroup}>
                    <span>Deskripsi</span>
                    <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Input Deskripsi"
                    style={{width: '100%', resize: 'vertical', minHeight: '100px'}}
                    required
                    />
                </div>
                {/*<div className={styles.formGroup}>
                    <span>Status</span>
                    <label>
                    <input
                    type="radio"
                    value="Lunas"
                    checked={status === "Lunas"}
                    onChange={(e) => setStatus(e.target.value)}
                    />
                    Lunas
                </label>
                <label>
                    <input
                    type="radio"
                    value="Belum Lunas"
                    checked={status === "Belum Lunas"}
                    onChange={(e) => setStatus(e.target.value)}
                    />
                    Belum Lunas
                </label>
                </div>*/}
                <button type="submit">
                    Simpan
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    {/*<th>Paket</th>
                    <th>Jumlah</th>
                    <th>Status</th>*/}
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pakets.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.deskripsi}</td>
                            {/*<td>{item.order_date}</td>
                            <td>{item.order_by}</td>
                            <td>{item.selected_package}</td>
                            <td>{item.qty}</td>
                            <td>{item.status}</td>*/}
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {pakets.length === 0 && (
                        <tr>
                            <td colSpan="5">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}
