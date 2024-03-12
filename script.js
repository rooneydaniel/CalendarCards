function generatePDF() {
    const calendarUrl = document.getElementById('calendarUrl').value;
    const teacherName = document.getElementById('teacherName').value;

    // Check if the inputs are not empty
    if (!calendarUrl || !teacherName) {
        alert("Please fill out both fields.");
        return;
    }

    // Initialize jsPDF
    const doc = new jspdf.jsPDF();

    // Generate QR code
    const qrCanvas = document.createElement('canvas');
    new QRCode(qrCanvas, calendarUrl);
    const qrImgData = qrCanvas.toDataURL("image/jpeg");

    // Calculate positions for 6 cards on a page (3x2 layout)
    const cardWidth = 60; // Adjust based on your needs
    const cardHeight = 100; // Adjust based on your needs
    const startX = 10;
    const startY = 10;
    const spaceX = 10;
    const spaceY = 10;

    for (let i = 0; i < 6; i++) {
        const x = startX + (i % 3) * (cardWidth + spaceX);
        const y = startY + Math.floor(i / 3) * (cardHeight + spaceY);

        // Add text
        doc.text("Parent-Teacher Conference Sign-Up", x, y, { maxWidth: cardWidth });
        doc.text(teacherName, x, y + 10, { maxWidth: cardWidth });

        // Add QR code image
        doc.addImage(qrImgData, 'JPEG', x, y + 15, 50, 50); // Adjust QR code size and position as needed
    }

    // Save the PDF
    doc.save('QR_Code_Cards.pdf');
}
