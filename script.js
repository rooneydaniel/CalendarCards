function generatePDF() {
    const calendarUrl = document.getElementById('calendarUrl').value;
    const teacherName = document.getElementById('teacherName').value;

    if (!calendarUrl || !teacherName) {
        alert("Please fill out both fields.");
        return;
    }

    // Initialize jsPDF
    const doc = new jspdf.jsPDF();

    // Set a nicer font
    doc.setFont("helvetica", "bold");

    // Generate QR code using 'qrcode-generator'
    let qr = qrcode(4, 'L'); // 'L' denotes low error correction
    qr.addData(calendarUrl);
    qr.make();

    // Create an image from the QR code
    let qrImgData = qr.createDataURL(4); // Increased scale for better resolution

    // Positioning and dimensions for the PDF
    const startX = 10, startY = 10, spaceX = 5, spaceY = 5; // Adjusted spacing for more cards
    const cardWidth = 50, cardHeight = 90; // Smaller dimensions for each card to fit 9 per page

    for (let i = 0; i < 9; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);

        const x = startX + col * (cardWidth + spaceX);
        const y = startY + row * (cardHeight + spaceY);

        // Add a simple border around each card
        doc.setDrawColor(0); // Set color to black for the border
        doc.rect(x, y, cardWidth, cardHeight, 'S'); // Draw rectangle for the border

        // Add the title with larger font size
        doc.setFontSize(11); // Adjusted for smaller space
        doc.text("Parent-Teacher Conference Sign-Up", x + 2, y + 10, { maxWidth: cardWidth - 4 });

        // Add the teacher's name with a smaller font size
        doc.setFontSize(9);
        doc.text(teacherName, x + 2, y + 20, { maxWidth: cardWidth - 4 });

        // Add the QR code image
        doc.addImage(qrImgData, 'PNG', x + 5, y + 25, 35, 35); // Adjusted QR code position and size
    }

    doc.save('QR_Code_Cards.pdf');
}
