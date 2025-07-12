"use client";
import styles from './CustomerPage.module.css';
import { useEffect, useState } from 'react';

export default function PaketPage() {

  const [formVisible, setFormVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [name, setName ] = useState('');
  const [phone, setPhone ] = useState('');
  const [email, setEmail ]= useState('');
//   const [createdAt, setCreatedAt]= useState('');
  /*const [qty, setQty ] = useState('');
  const [status, setStatus ] = useState('');*/
  const [msg, setMsg ] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchCustomers = async () => {
    const res = await fetch('/api/customer');
    const data = await res.json();
    setCustomers(data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/customer/${editId}` : '/api/customer';
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email }),
        });

        if (res.ok) {
            setMsg('Berhasil disimpan');
            setName('');
            setPhone('');
            setEmail('');
            /*setCreatedAt('');
            /*setQty('');
            setStatus('');*/
            setEditId(null);
            setFormVisible(false);
            fetchCustomers(); // refresh data
        } else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setPhone(item.phone);
        setEmail(item.email);
        /*setCreatedAt(item.createdAt);*/
        /*setQty(item.qty);
        setStatus(item.status === "Lunas" ? "Lunas" : "Belum Lunas");*/
        setEditId(item.id);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;

        await fetch(`/api/customer/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        fetchCustomers();
    };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Ayam Penyet Koh Alex</h1>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        <button style={{ marginRight: '10px', float: 'right' }} onClick={() => window.location.href = '/preorder'}>Menu Preorder</button>
        <button style={{ marginRight: '10px', float: 'right' }} onClick={() => window.location.href = '/paket'}>Menu Paket</button>
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Input Data Baru</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Nama Pelanggan</span>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan Nama Pelanggan"
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Nomor Telepon</span>
                    <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Masukkan Nomor Telepon"
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
                    <span>Email</span>
                    <textarea
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input Email"
                    /*style={{width: '100%', resize: 'vertical', minHeight: '100px'}}*/
                    />
                </div>
                {/* <div className={styles.formGroup}>
                    <span>Tanggal Pembuatan</span>
                    <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    required
                    />
                </div> */}
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
                    <th>Nama Pelanggan</th>
                    <th>Nomor Telepon</th>
                    <th>Email</th>
                    <th>Tanggal Pembuatan</th>
                    {/*<th>Paket</th>
                    <th>Jumlah</th>
                    <th>Status</th>*/}
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {customers.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.createdAt}</td>
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
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan="6">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}
