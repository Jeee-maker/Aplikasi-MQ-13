async function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    // Gunakan URL Web App terbaru Anda
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzglhWAKYJ-tk7517n1qHqKtbmLsGNR1LTd_WRO0EsKHDrmvCxQMt6P78u6krbhGtt99g/exec";

    if (user === "" || pass === "") {
        alert("Nama dan Sandi tidak boleh kosong!");
        return;
    }

    try {
        const finalUrl = `${webAppUrl}?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
        const response = await fetch(finalUrl);
        const data = await response.json();

        if (data.result === "success") {
            // 1. ISI DATA DULU (Hubungkan data dari Google ke ID HTML)
            document.getElementById('info-terbayar').innerText = data.terbayar || "0";
            document.getElementById('info-kurang').innerText = data.kurang || "0";
            document.getElementById('info-seharusnya').innerText = data.seharusnya || "0";
            
            // 2. BARU PINDAH HALAMAN
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('dashboard-page').style.display = 'block';
        } else {
            alert("Nama Murid atau Sandi salah!");
        }
    } catch (error) {
        console.error("Error detail:", error);
        alert("Gagal terhubung ke database. Cek koneksi internet.");
    }
}