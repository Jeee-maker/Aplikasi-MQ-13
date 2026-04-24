async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    // Gunakan URL Web App terbaru Anda
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzglhWAKYJ-tk7517n1qHqKtbmLsGNR1LTd_WRO0EsKHDrmvCxQMt6P78u6krbhGtt99g/exec";

    if (user === "" || pass === "") {
        alert("Username dan Password tidak boleh kosonggggggggggggggggggggggg. Coba isi dulu ya!");
        return;
    }

    try {
        const finalUrl = `${webAppUrl}?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
        const response = await fetch(finalUrl);
        const data = await response.json();

        if (data.result === "success") {
            const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        }).format(angka);
    };
            // 1. ISI DATA DULU (Hubungkan data dari Google ke ID HTML)
            document.getElementById('info-terbayar').innerText = formatRupiah(Number(data.terbayar) || 0);
    document.getElementById('info-kurang').innerText = formatRupiah(Number(data.kurang) || 0);
    document.getElementById('info-seharusnya').innerText = formatRupiah(Number(data.seharusnya) || 0);

            // 2. BARU PINDAH HALAMAN
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('dashboard-page').style.display = 'block';
        } else {
            alert("Hmmmmmmmmmmmmmmmmmmmmmm, Kaya nya Username atau Password kamu salah deh. Coba ingat-ingat lagi ya!");
        }
    } catch (error) {
        console.error("Error detail:", error);
        alert("Gagal terhubung ke database. Cek koneksi internet.");
    }
}