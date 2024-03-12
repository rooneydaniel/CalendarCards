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

    // Generate QR code and ensure it's fully rendered before adding to PDF
    const qrCanvas = document.createElement('canvas');
    const qr = new QRCode(qrCanvas, {
        text: calendarUrl,
        width: 64,
        height: 64,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
        useSVG: false
    });

    // Using a timeout to allow QR code to render
    setTimeout(() => {
        const qrImgData = qrCanvas.toDataURL("image/jpeg");

        // Calculate positions for 6 cards on a page (3x2 layout)
        const cardWidth = 60; // Adjust based on your needs
        const cardHeight = 100; // Adjust based on your needs
        const startX = 10;
        const startY = 20; // Increased startY to give more space at the top
        const spaceX = 10;
        const spaceY = 20; // Increased spaceY for more vertical spacing

        for (let i = 0; i < 6; i++) {
            const x = startX + (i % 3) * (cardWidth + spaceX);
            const y = startY + Math.floor(i / 3) * (cardHeight + spaceY);

            // Add title and name with adjusted spacing
            doc.text("Parent-Teacher Conference Sign-Up", x, y, { maxWidth: cardWidth });
            doc.text(teacherName, x, y + 10, { maxWidth: cardWidth }); // Adjust as necessary

            // Add QR code image, adjust position if needed
            doc.addImage(qrImgData, 'JPEG', x, y + 20, 50, 50); // Adjust QR code size and position as needed
        }

        // Save the PDF
        doc.save('QR_Code_Cards.pdf');
    }, 500); // Adjust timeout as necessary to ensure QR code renders
}
