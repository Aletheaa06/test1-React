
import Badge from "./badge";
import styles from "./MenuCard.module.css";

function MenuCard({ menu, onTambah }) {
    const habis = menu.stok === 0;

    return (
        <div className={`${styles.kartu} ${habis ? styles.habis : ""}`}>
            <h3>{menu.nama}</h3>

            <Badge>{menu.kategori}</Badge>

            <p>
                Harga:{" "}
                {menu.harga.toLocaleString("id-ID", {style: "currency",currency: "IDR",maximumFractionDigits: 0})}
            </p>

            <p>Stok: {menu.stok}</p>

            {habis && <Badge className={styles.habisBadge}>Habis</Badge>}

            <button type="button"disabled={habis} onClick={() => onTambah(menu)}>
                {habis ? "Stok Habis" : "Tambah"}
            </button>
        </div>
    );
}

export default MenuCard;
