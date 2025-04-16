/* eslint-disable no-unused-vars */
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jsPDF } from "jspdf"

export default function App() {
    const [formData, setFormData] = useState({
        // Company info
        companyName: "",
        contactPerson: "",
        street: "",
        postalCodeCity: "",

        // Company info
        bankName: "",
        Inhaber: "",
        IbanNum: "",
        BIC: "",


        // Invoice details
        invoiceNumber: "",
        invoiceDate: "",
        orderDate: "",
        paymentMethod: "",

        // Transfer details
        transferDate: "",
        returnDate: "",
        passengerName: "",
        fromLocation: "",
        toLocation: "",
        flightNumber: "",
        duration: "",
        distance: "",
        passengers: "",
        luggage: "",
        vehicleType: "",

        // Price
        price: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const generatePDF = () => {
        const doc = new jsPDF()

        // Add logo
        // doc.addImage("/assets/logo.png", "PNG", 20, 20, 40, 20)

        // Add RECHNUNG title
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text("RECHNUNG", 20, 50)
        doc.setFont("helvetica", "normal")

        // Customer info (left side)
        doc.setFontSize(10)
        doc.text(formData.passengerName, 20, 60)
        doc.text(formData.street, 20, 65)
        doc.text(formData.postalCodeCity, 20, 70)

        // Invoice details (right side)
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)

        // Labels
        doc.text("Rechnungsnummer:", 140, 60)
        doc.text("Rechnungsdatum:", 140, 65)
        doc.text("Bestelldatum:", 140, 70)
        doc.text("Zahlungsart:", 140, 75)

        // Values - right aligned
        doc.setTextColor(0, 0, 0)
        doc.text(formData.invoiceNumber, 190, 60, { align: "right" })
        doc.text(formData.invoiceDate, 190, 65, { align: "right" })
        doc.text(formData.orderDate, 190, 70, { align: "right" })
        doc.text(formData.paymentMethod, 190, 75, { align: "right" })

        // Transfer table header
        doc.setFillColor(0, 0, 0)
        doc.rect(20, 85, 170, 7, "F")
        doc.setTextColor(255, 255, 255)
        doc.text("Transfer", 25, 90)
        doc.text("Preis", 185, 90, { align: "right" })

        // Reset text color
        doc.setTextColor(0, 0, 0)

        // Transfer details
        const startY = 100
        // Date
        doc.setFont("helvetica", "bold");
        doc.text("Date:", 20, startY);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.transferDate}`, 30, startY);

        // Date
        doc.setFont("helvetica", "bold");
        doc.text("Return Date:", 20, startY + 5);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.returnDate}`, 42, startY + 5);

        // Passenger Name
        doc.setFont("helvetica", "bold");
        doc.text("Passenger name:", 20, startY + 10);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.passengerName}`, 50, startY + 10);

        // From
        doc.setFont("helvetica", "bold");
        doc.text("From:", 20, startY + 15);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.fromLocation}`, 30, startY + 15);

        // To
        doc.setFont("helvetica", "bold");
        doc.text("To:", 20, startY + 20);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.toLocation}`, 26, startY + 20);


        // Line below "To"
        doc.setDrawColor(0, 0, 0)
        doc.line(20, startY + 25, 190, startY + 25)

        // Continue with other details
        // Flight Number
        doc.setFont("helvetica", "bold");
        doc.text("Flight number:", 20, startY + 30);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.flightNumber}`, 45, startY + 30);

        // Duration
        doc.setFont("helvetica", "bold");
        doc.text("Duration:", 20, startY + 35);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.duration}`, 36, startY + 35);

        // Distance
        doc.setFont("helvetica", "bold");
        doc.text("Distance:", 20, startY + 40);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.distance}`, 36, startY + 40);

        // Passengers
        doc.setFont("helvetica", "bold");
        doc.text("Passengers:", 20, startY + 45);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.passengers}`, 42, startY + 45);

        // Luggages
        doc.setFont("helvetica", "bold");
        doc.text("Luggages:", 20, startY + 50);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.luggage}`, 38, startY + 50);

        // Vehicle Type
        doc.setFont("helvetica", "bold");
        doc.text("Vehicle Type:", 20, startY + 55);
        doc.setFont("helvetica", "normal");
        doc.text(`${formData.vehicleType}`, 44, startY + 55);


        // Price on the right
        doc.text(`${formData.price}€`, 185, startY, { align: "right" })

        // Line below "To"
        doc.setDrawColor(0, 0, 0)
        doc.line(20, startY + 60, 190, startY + 60)

        // Bank Detail Field
        doc.setFont("helvetica", "bold");
        doc.text("Anmerkungen", 20, startY + 65);

        doc.setFont("helvetica", "normal");
        doc.text(`Bitte auf das folgende Konto überweisen:`, 20, startY + 70)
        doc.text(`Bank: ${formData.bankName}`, 20, startY + 75)
        doc.text(`Inhaber: ${formData.Inhaber}`, 20, startY + 80)
        doc.text(`IBAN: ${formData.IbanNum}`, 20, startY + 85)
        doc.text(`BIC: ${formData.BIC}`, 20, startY + 90)
        doc.setFont("helvetica", "bold");
        doc.text(`Zahlungshinweis:`, 20, startY + 95)
        doc.setFont("helvetica", "normal");
        doc.text(`Zahlbar bis 16.03.2024 ohne Abzug von Skonto`, 20, startY + 100)

        // Totals section
        const price = Number.parseFloat(formData.price) || 0
        const vat = price * 0.19 // Assuming 19% VAT

        // Zwischensumme
        doc.setFont("helvetica", "bold");
        doc.text("Zwischensumme", 140, startY + 70)
        doc.setFont("helvetica", "normal");
        doc.text(`${price.toFixed(2)}€`, 190, startY + 70, { align: "right" })

        // Border line
        doc.line(140, startY + 75, 190, startY + 75)

        // Gesamt
        doc.setFont("helvetica", "bold");
        doc.text("Gesamt", 140, startY + 80)
        doc.text(`${price.toFixed(2)}€ (inkl. ${vat.toFixed(2)}€`, 190, startY + 80, { align: "right" })
        doc.text("Umsatzsteuer)", 190, startY + 85, { align: "right" })

        // Border line
        doc.line(140, startY + 90, 190, startY + 90)

        // Footer line
        doc.line(20, 260, 190, 260)

        // Footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9)
        doc.text("Muhammad Afzal,", 105, 270, { align: "center" })
        doc.text("Zentmarkweg 39, 60489 Frankfurt am Main", 105, 275, { align: "center" })
        doc.text("Phone: +49 176 57844670 | DE29829589 | Email: info@transfer511.com", 105, 280, { align: "center" })

        // Save the PDF
        doc.save(`Rechnung-${formData.invoiceNumber}.pdf`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-orange-600 text-white p-6">
                <div className="container mx-auto">
                    <motion.h1
                        className="text-3xl font-bold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Transfer511
                    </motion.h1>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">Invoice Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium mb-4 text-red-600">Company Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="companyName">Company Name</Label>
                                            <Input
                                                id="companyName"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="e.g. Fuyao GmbH"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contactPerson">Contact Person</Label>
                                            <Input
                                                id="contactPerson"
                                                name="contactPerson"
                                                value={formData.contactPerson}
                                                onChange={handleChange}
                                                placeholder="e.g. Herr Zhao"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="street">Street</Label>
                                            <Input
                                                id="street"
                                                name="street"
                                                value={formData.street}
                                                onChange={handleChange}
                                                placeholder="e.g. Ohmstraße 1"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCodeCity">Postal Code & City</Label>
                                            <Input
                                                id="postalCodeCity"
                                                name="postalCodeCity"
                                                value={formData.postalCodeCity}
                                                onChange={handleChange}
                                                placeholder="e.g. 74211 Leingarten"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4 text-red-600">Invoice Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="invoiceNumber">Invoice Number</Label>
                                            <Input
                                                id="invoiceNumber"
                                                name="invoiceNumber"
                                                value={formData.invoiceNumber}
                                                onChange={handleChange}
                                                placeholder="e.g. 378"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="invoiceDate">Invoice Date</Label>
                                            <Input
                                                id="invoiceDate"
                                                name="invoiceDate"
                                                value={formData.invoiceDate}
                                                onChange={handleChange}
                                                placeholder="e.g. Februar 29, 2024"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="orderDate">Order Date</Label>
                                            <Input
                                                id="orderDate"
                                                name="orderDate"
                                                value={formData.orderDate}
                                                onChange={handleChange}
                                                placeholder="e.g. Februar 25, 2024"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="paymentMethod">Payment Method</Label>
                                            <Select
                                                value={formData.paymentMethod}
                                                onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Andere">Andere</SelectItem>
                                                    <SelectItem value="Barzahlung">Barzahlung</SelectItem>
                                                    <SelectItem value="Überweisung">Überweisung</SelectItem>
                                                    <SelectItem value="Kreditkarte">Kreditkarte</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4 text-red-600">Transfer Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="transferDate">Transfer Date</Label>
                                            <Input
                                                type="date"
                                                id="transferDate"
                                                name="transferDate"
                                                value={formData.transferDate}
                                                onChange={handleChange}
                                                placeholder="e.g. Februar 26, 2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="returnDate">Return Date</Label>
                                            <Input
                                                type="date"
                                                id="returnDate"
                                                name="returnDate"
                                                value={formData.returnDate}
                                                onChange={handleChange}
                                                placeholder="e.g. Februar 28, 2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="passengerName">Passenger Name</Label>
                                            <Input
                                                id="passengerName"
                                                name="passengerName"
                                                value={formData.passengerName}
                                                onChange={handleChange}
                                                placeholder="e.g. Herr Zhao"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="fromLocation">From</Label>
                                            <Input
                                                id="fromLocation"
                                                name="fromLocation"
                                                value={formData.fromLocation}
                                                onChange={handleChange}
                                                placeholder="e.g. Holiday Inn Frankfurt Airport"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="toLocation">To</Label>
                                            <Input
                                                id="toLocation"
                                                name="toLocation"
                                                value={formData.toLocation}
                                                onChange={handleChange}
                                                placeholder="e.g. Ohmstraße 1, Leingarten"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="flightNumber">Flight Number</Label>
                                            <Input
                                                id="flightNumber"
                                                name="flightNumber"
                                                value={formData.flightNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="distance">Distance</Label>
                                            <Input
                                                id="distance"
                                                name="distance"
                                                value={formData.distance}
                                                onChange={handleChange}
                                                placeholder="e.g. 85.8"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="passengers">Passengers</Label>
                                            <Input
                                                id="passengers"
                                                name="passengers"
                                                value={formData.passengers}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="luggage">Luggage</Label>
                                            <Input
                                                id="luggage"
                                                name="luggage"
                                                value={formData.luggage}
                                                onChange={handleChange}
                                                type="number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleType">Vehicle Type</Label>
                                            <Select
                                                value={formData.vehicleType}
                                                onValueChange={(value) => handleSelectChange("vehicleType", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select vehicle type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Standart Kombi class">Standart Kombi class</SelectItem>
                                                    <SelectItem value="Limousine class">Limousine class</SelectItem>
                                                    <SelectItem value="Van class">Van class</SelectItem>
                                                    <SelectItem value="Business class">Business class</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4 text-red-600">Price</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price (€)</Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                type="number"
                                                placeholder="e.g. 185.00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />


                                <div>
                                    <h3 className="text-lg font-medium mb-4 text-red-600">Bank Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bankName">Bank Name</Label>
                                            <Input
                                                id="bankName"
                                                name="bankName"
                                                value={formData.bankName}
                                                onChange={handleChange}
                                                placeholder="e.g. Frankfurter Sparkasse"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="Inhaber">Inhaber</Label>
                                            <Input
                                                id="Inhaber"
                                                name="Inhaber"
                                                value={formData.Inhaber}
                                                onChange={handleChange}
                                                placeholder="e.g. Herr Zhao"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="IbanNum">IBAN</Label>
                                            <Input
                                                id="IbanNum"
                                                name="IbanNum"
                                                value={formData.IbanNum}
                                                onChange={handleChange}
                                                placeholder="e.g. Ohmstraße 1"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="BIC">BIC</Label>
                                            <Input
                                                id="BIC"
                                                name="BIC"
                                                value={formData.BIC}
                                                onChange={handleChange}
                                                placeholder="e.g. 74211 Leingarten"
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="flex justify-center pt-4">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="button"
                                            onClick={generatePDF}
                                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2"
                                        >
                                            Download PDF
                                        </Button>
                                    </motion.div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>

            <footer className="bg-orange-600 text-white p-6 mt-12">
                <div className="container mx-auto text-center">
                    <p>© {new Date().getFullYear()} Transfer511. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
