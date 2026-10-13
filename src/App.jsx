import { useEffect, useRef, useState } from "react";
import { semuaMenu } from "./data/menu";

import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import FormMenu from "./components/FormMenu";
import TimerSesi from "./components/TimerSesi";

import "./App.css";

function App() {
    const [daftarMenu, setDaftarMenu] = useState(semuaMenu);
    const [keyword, setKeyword] = useState("");
    const [kategoriAktif, setKategoriAktif] = useState("semua");

    const [keranjang, setKeranjang] = useState(() => {
        try {
            const dataTersimpan = localStorage.getItem("keranjang");

            return dataTersimpan
                ? JSON.parse(dataTersimpan)
                : [];
        } catch {
            return [];
        }
    });

    const [timerAktif, setTimerAktif] = useState(true);
    const inputRef = useRef(null);

    const daftarKategori = [
        "semua",
        ...new Set(
            daftarMenu.map((menu) => menu.kategori)
        )
    ];

    const menuTampil = daftarMenu.filter((menu) => {
        const cariNama = menu.nama
            .toLowerCase()
            .includes(keyword.toLowerCase());

        const cariKategori =
            kategoriAktif === "semua" ||
            menu.kategori === kategoriAktif;

        return cariNama && cariKategori;
    });

    const jumlahItem = keranjang.reduce(
        (total, item) => total + item.qty,
        0
    );

    useEffect(() => {
        localStorage.setItem(
            "keranjang",
            JSON.stringify(keranjang)
        );
    }, [keranjang]);

    useEffect(() => {
        document.title =
            jumlahItem > 0
                ? `(${jumlahItem}) KantinKita`
                : "KantinKita";
    }, [jumlahItem]);

    function tambahKeranjang(menu) {
        if (menu.stok === 0) return;

        setKeranjang((prev) => {
            const sudahAda = prev.some(
                (item) => item.id === menu.id
            );

            if (sudahAda) {
                return prev.map((item) =>
                    item.id === menu.id
                        ? { ...item, qty: item.qty + 1 }: item
                );
            }

            return [...prev, { ...menu, qty: 1 }];
        });
    }

    function kurangiKeranjang(id) {
        setKeranjang((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }: item
                )
                .filter((item) => item.qty > 0)
        );
    }

    function hapusKeranjang(id) {
        setKeranjang((prev) =>
            prev.filter((item) => item.id !== id)
        );
    }

    function tambahMenuBaru(menuBaru) {
        const idBaru =
            Math.max(
                0,
                ...daftarMenu.map((menu) => menu.id)
            ) + 1;

        setDaftarMenu((prev) => [
            ...prev,
            { ...menuBaru, id: idBaru }
        ]);

        setKategoriAktif("semua");
        setKeyword("");
    }

    function bersihkanPencarian() {
        setKeyword("");
    }

    return (
        <div className="container">
            <header>
                <h1>KantinKita</h1>
                <p>Jumlah item di keranjang: {jumlahItem}</p>
            </header>

            <section>
                <h2>Timer Sesi</h2>

                <button
                    type="button"
                    onClick={() =>
                        setTimerAktif((prev) => !prev)
                    }
                >
                    {timerAktif
                        ? "Matikan Timer"
                        : "Nyalakan Timer"}
                </button>

                {timerAktif && <TimerSesi />}
            </section>

            <FilterBar
                keyword={keyword}
                onKeywordChange={setKeyword}
                kategoriAktif={kategoriAktif}
                onKategoriChange={setKategoriAktif}
                daftarKategori={daftarKategori}
                daftarMenu={daftarMenu}
                inputRef={inputRef}
                onBersihkan={bersihkanPencarian}
            />

            <h2>Daftar Menu</h2>

            {menuTampil.length === 0 ? (
                <p>
                    Menu tidak ditemukan untuk kata kunci
                    "{keyword || "-"}" dan kategori
                    "{kategoriAktif}".
                </p>
            ) : (
                <MenuList
                    daftarMenu={menuTampil}
                    onTambah={tambahKeranjang}
                />
            )}

            <Keranjang
                keranjang={keranjang}
                onTambah={tambahKeranjang}
                onKurang={kurangiKeranjang}
                onHapus={hapusKeranjang}
            />

            <FormMenu onTambahMenu={tambahMenuBaru} />
        </div>
    );
}

export default App;
