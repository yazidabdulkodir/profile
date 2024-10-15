const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  let currentIndex = 0;
  const images = carousel.querySelectorAll("img");
  const totalImages = images.length;
  const dotsContainer = carousel.querySelector(".dots");
  let startX = 0,
    currentX = 0,
    translateX = 0,
    isSwiping = false;

  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");

  // Fungsi untuk memperbarui tombol navigasi
  const updateButtons = () => {
    if (prevButton) prevButton.style.display = currentIndex === 0 ? "none" : "block";
    if (nextButton) nextButton.style.display = currentIndex === totalImages - 1 ? "none" : "block";
  };

  // Buat elemen dots
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("span");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("span");

  const showImage = (index) => {
    translateX = -index * 100; // Geser sesuai index gambar
    carousel.querySelector(".image-wrapper").style.transform = `translateX(${translateX}%)`;
    currentIndex = index;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Update tombol next/prev
    updateButtons();
  };

  // Fungsi swipe mengikuti jari
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
    carousel.querySelector(".image-wrapper").style.transition = "none"; // Hilangkan transisi untuk swipe real-time
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
    const difference = currentX - startX;
    carousel.querySelector(".image-wrapper").style.transform = `translateX(${translateX + (difference / carousel.offsetWidth) * 100}%)`; // Gambar mengikuti jari
  });

  carousel.addEventListener("touchend", (e) => {
    isSwiping = false;
    const difference = currentX - startX;

    // Geser gambar jika swipe cukup jauh, lebih dari 30% lebar layar
    if (difference > carousel.offsetWidth * 0.3 && currentIndex > 0) {
      currentIndex--; // Hanya kurangi index jika bukan gambar pertama
    } else if (difference < -carousel.offsetWidth * 0.3 && currentIndex < totalImages - 1) {
      currentIndex++; // Hanya tambahkan index jika bukan gambar terakhir
    }

    carousel.querySelector(".image-wrapper").style.transition = "transform 0.3s ease"; // Kembalikan transisi
    showImage(currentIndex);
  });

  // Tombol manual slide
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentIndex < totalImages - 1) {
        currentIndex++;
        showImage(currentIndex);
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      }
    });
  }

  // Interaksi dengan dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      showImage(currentIndex);
    });
  });

  // Tampilkan gambar pertama secara default dan perbarui tombol
  showImage(currentIndex);
});
