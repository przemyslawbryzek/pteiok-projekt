from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import datetime
import os
pdfmetrics.registerFont(TTFont('DejaVu', 'fonts/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', 'fonts/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu-Oblique', 'fonts/DejaVuSans-Oblique.ttf'))

def generate_order_pdf(order, payment):
    folder = "pdfs"
    os.makedirs(folder, exist_ok=True)
    filename = f"order_{order.id}.pdf"
    path = os.path.join(folder, filename)

    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    c.setFont("DejaVu-Bold", 18)
    c.drawString(50, height - 80, "Potwierdzenie zamówienia")

    c.setFont("DejaVu", 10)
    y = height - 120
    c.drawString(50, y, f"Numer zamówienia: {order.id}")
    c.drawString(50, y - 20, f"Data zamówienia: {order.created_at.strftime('%Y-%m-%d %H:%M')}")
    c.drawString(50, y - 40, f"Użytkownik: {order.user.email}")
    c.drawString(50, y - 60, f"Status: {order.status.capitalize()}")

    if payment:
        c.drawString(50, y - 100, f"Metoda płatności: {payment.provider.capitalize()}")
        c.drawString(50, y - 120, f"Status płatności: {payment.status}")
        c.drawString(50, y - 140, f"Kwota: {payment.amount:.2f} {payment.currency.upper()}")
        c.drawString(50, y - 160, f"ID transakcji: {payment.transaction_id}")

    table_y = y - 220
    c.setFont("DejaVu-Bold", 14)
    c.drawString(50, table_y, "Produkty:")

    data = [["#", "Nazwa produktu", "Ilość", "Cena jednostkowa", "Suma"]]
    for i, item in enumerate(order.items, start=1):
        data.append([
            str(i),
            item.product.name,
            str(item.quantity),
            f"{item.product.price:.2f} PLN",
            f"{item.product.price * item.quantity:.2f} PLN"
        ])

    table = Table(data, colWidths=[30, 220, 80, 100, 100])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#4B89DC")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'DejaVu-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 3),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor("#F7F9FB")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.gray),
    ]))

    table.wrapOn(c, width, height)
    table.drawOn(c, 50, table_y - (len(data) * 20) - 20)

    total = sum(item.product.price * item.quantity for item in order.items)
    c.setFont("DejaVu-Bold", 12)
    c.drawString(350, table_y - (len(data) * 20) - 60, f"Razem: {total:.2f} PLN")

    c.setFont("DejaVu-Oblique", 9)
    c.drawString(50, 50, f"Wygenerowano: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    c.save()
    return path
