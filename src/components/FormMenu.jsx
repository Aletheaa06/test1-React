
import { useState } from "react";

const formAwal = {
    nama: "",
    kategori: "",
    harga: 0,
    stok: 0
};

function FormMenu({ onTambahMenu }) {
    const [form, setForm] = useState(formAwal);
    const [error, setError] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({...prev,[name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const errorBaru = {};
        const harga = Number(form.harga);
        const stok = Number(form.stok);

        if (form.nama.trim().length < 3) {
            errorBaru.nama = "Nama minimal 3 karakter.";
        }

        if (!form.kategori) {
            errorBaru.kategori = "Kategori wajib dipilih.";
        }

        if (form.harga === "" || harga <= 0) {
            errorBaru.harga = "Harga harus lebih dari 0.";
        }

        if (form.stok === "" || stok < 0) {
            errorBaru.stok = "Stok tidak boleh minus(-).";
        }

        setError(errorBaru);

        if (Object.keys(errorBaru).length > 0) {
            return;
        }

        onTambahMenu({
            nama: form.nama.trim(),
            kategori: form.kategori,
            harga,
            stok
        });

        setForm(formAwal);
        setError({});
    }

    return (
        <section>
            <h2>Tambah Menu</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nama-menu">Nama menu</label>
                    <input
                        id="nama-menu"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                    />
                    {error.nama && (
                        <p role="alert">{error.nama}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="kategori-menu">Kategori</label>
                    <select id="kategori-menu" name="kategori" value={form.kategori} onChange={handleChange}>
                        <option value="">Pilih kategori</option>
                        <option value="makanan">Makanan</option>
                        <option value="minuman">Minuman</option>
                        <option value="camilan">Camilan</option>
                    </select>
                    {error.kategori && (
                        <p role="alert">{error.kategori}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="harga-menu">Harga</label>
                    <input id="harga-menu" name="harga" type="number" value={form.harga} onChange={handleChange}/>
                    {error.harga && (
                        <p role="alert">{error.harga}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="stok-menu">Stok</label>
                    <input id="stok-menu"
                        name="stok" type="number" value={form.stok} onChange={handleChange}/>
                    {error.stok && (
                        <p role="alert">{error.stok}</p>
                    )}
                </div>

                <button type="submit">Simpan Menu</button>
            </form>
        </section>
    );
}

export default FormMenu;
