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

    // Adjusted the QR code generation to synchronize with the PDF creation
    const qrCanvas = document.createElement('canvas');
    // Assuming QRCode is synchronous or this constructor callback is instant
    new QRCode(qrCanvas, {
        text: calendarUrl,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Extract the QR code as an image after a slight delay to ensure rendering
    setTimeout(() => {
        const qrImgData = qrCanvas.toDataURL("image/jpeg");

        // Define card dimensions and layout parameters
        const cardsPerRow = 3;
        const cardWidth = 60; // Adjust card width as necessary
        const cardHeight = 100; // Adjust card height as necessary
        const startX = 15; // Starting X position
        const startY = 25; // Starting Y position, adjusted for better spacing
        const xSpacing = 10; // Spacing between cards horizontally
        const ySpacing = 20; // Spacing between cards vertically, adjusted for better text spacing

        // Generate cards in a 3x2 layout
        for (let i = 0; i < 6; i++) {
            const row = Math.floor(i / cardsPerRow);
            const col = i % cardsPerRow;

            const x = startX + (col * (cardWidth + xSpacing));
            const y = startY + (row * (cardHeight + ySpacing));

            // Print the text above the QR code
            doc.text("Parent-Teacher Conference Sign-Up", x, y - 10, { maxWidth: cardWidth });
            doc.text(teacherName, x, y, { maxWidth: cardWidth });

            // Add the QR code image
            doc.addImage(qrImgData, 'JPEG', x, y + 10, 40, 40); // Adjusted QR code size and position
        }

        // Save the generated PDF
        doc.save('QR_Code_Cards.pdf');
    }, 1000); // Increased timeout to ensure the QR code is rendered
}
