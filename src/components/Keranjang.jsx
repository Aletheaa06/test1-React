
function Keranjang({ keranjang, onTambah, onKurang, onHapus }) {
    const jumlahItem = keranjang.reduce(
        (total, item) => total + item.qty,0
    );

    const totalHarga = keranjang.reduce(
        (total, item) => total + item.harga * item.qty,0
    );

    function hapusDenganKonfirmasi(id, nama) {
        const konfirmasi = window.confirm(
            `Hapus ${nama} dari keranjang?`
        );

        if (konfirmasi) {
            onHapus(id);
        }
    }

    return (
        <section>
            <h2>Keranjang</h2>

            <p>Jumlah item: {jumlahItem}</p>

            {keranjang.length === 0 ? (
                <p>Keranjang masih kosong.</p>
            ) : (
                keranjang.map((item) => (
                    <div key={item.id}>
                        <h3>{item.nama}</h3>

                        <p>
                            {item.harga.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0
                            })}
                        </p>

                        <button
                            type="button"
                            onClick={() => onKurang(item.id)
                            }
                        >
                            -
                        </button>

                        <span> {item.qty} </span>

                        <button
                            type="button"
                            onClick={() => onTambah(item)
                            }
                        >
                            +
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                hapusDenganKonfirmasi(item.id,item.nama)
                                }>
                            Hapus
                        </button>
                    </div>
                ))
            )}

            <h3>
                Total:{" "}
                {totalHarga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                })}
            </h3>
        </section>
    );
}

export default Keranjang;
