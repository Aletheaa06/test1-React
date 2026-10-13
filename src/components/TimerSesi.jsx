
import { useEffect, useState } from "react";

function TimerSesi() {
    const [detik, setDetik] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {setDetik((prev) => prev + 1);}, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60;

    return (
        <p>
            Timer sesi:{" "}
            {menit < 10 ? "0" + menit : menit}:
            {sisaDetik < 10 ? "0" + sisaDetik : sisaDetik}
        </p>
    );
}

export default TimerSesi;
