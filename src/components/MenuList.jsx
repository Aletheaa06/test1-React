
import MenuCard from "./MenuCard";

function MenuList({ daftarMenu, onTambah }) {
    if (daftarMenu.length === 0) {
        return <p>Menu tidak ditemukan.</p>;
    }

    return (
        <div className="daftar-menu">
            {daftarMenu.map((menu) => (
                <MenuCard
                    key={menu.id}
                    menu={menu}
                    onTambah={onTambah}
                />
            ))}
        </div>
    );
}

export default MenuList;
