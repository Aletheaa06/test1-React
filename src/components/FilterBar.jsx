
function FilterBar({
    keyword,
    onKeywordChange,
    kategoriAktif,
    onKategoriChange,
    daftarKategori,
    daftarMenu,
    inputRef,
    onBersihkan
}) {
    const totalMenu = daftarMenu.filter((menu) => {
        const cariNama = menu.nama
            .toLowerCase()
            .includes(keyword.toLowerCase());

        const cariKategori =
            kategoriAktif === "semua" ||
            menu.kategori === kategoriAktif;

        return cariNama && cariKategori;
    }).length;

    return (
        <section>
            <label htmlFor="cari-menu">Cari menu</label>

            <p>Total Menu: {totalMenu}</p>

            <input
                id="cari-menu"
                ref={inputRef}
                type="text"
                value={keyword}
                onChange={(e) =>
                    onKeywordChange(e.target.value)
                }
                placeholder="Masukkan menu..."
            />

            <button
                type="button"
                onClick={onBersihkan}>
                Bersihkan
            </button>

            <div>
                {daftarKategori.map((kategori) => (
                    <button
                        key={kategori}
                        type="button"
                        onClick={() =>
                            onKategoriChange(kategori)
                        }
                        disabled={kategoriAktif === kategori}
                    >
                        {kategori === "semua"
                            ? "Semua": kategori}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default FilterBar;
