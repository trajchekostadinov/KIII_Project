package com.example.invoicesstripe.web;

import com.example.invoicesstripe.dto.InvoiceRequest;
import com.example.invoicesstripe.model.Client;
import  com.example.invoicesstripe.model.Invoice;
import com.example.invoicesstripe.model.InvoiceStatus;
import com.example.invoicesstripe.repository.ClientRepository;
import com.example.invoicesstripe.repository.InvoiceRepository;
import com.example.invoicesstripe.service.EmailService;
import com.example.invoicesstripe.service.InvoiceService;
import com.example.invoicesstripe.service.StripeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final StripeService stripeService;
    private final EmailService emailService;


    public InvoiceController(InvoiceService invoiceService, InvoiceRepository invoiceRepository, ClientRepository clientRepository, StripeService stripeService, EmailService emailService) {
        this.invoiceService = invoiceService;
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
        this.stripeService = stripeService;
        this.emailService = emailService;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAll(
            @RequestParam(required = false) InvoiceStatus status) {
        if (status != null) {
            return ResponseEntity.ok(invoiceService.getByStatus(status));
        }
        return ResponseEntity.ok(invoiceService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

//    @PostMapping()
//    public ResponseEntity<Invoice> create(@RequestBody Invoice invoice) {
//        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.create(invoice));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> update(@PathVariable Long id, @RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.update(id, invoice));
    }

    @PostMapping("/{id}/send")
    public ResponseEntity<String> sendInvoice(@PathVariable Long id) throws StripeException {

        Invoice invoice = invoiceService.getById(id);

        String url = stripeService.createCheckoutSession(invoice);

        emailService.sendInvoiceEmail(
                invoice.getClient().getEmail(),
                url
        );

        return ResponseEntity.ok(url);
    }
    @PostMapping("/pay/success")
    public ResponseEntity<String> markPaid(@RequestParam String token) {

        Invoice invoice = invoiceRepository.findByPaymentToken(token);

        if (invoice == null) {
            return ResponseEntity.status(404).body("Invoice not found");
        }

        invoice.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice);

        return ResponseEntity.ok("Paid successfully");
    }

    @PostMapping
    public ResponseEntity<Invoice> create(@RequestBody InvoiceRequest req) {

        Client client = clientRepository.findById(req.clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber(req.invoiceNumber);
        invoice.setAmount(req.amount);
        invoice.setClient(client);
        invoice.setStatus(InvoiceStatus.DRAFT);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(invoiceService.create(invoice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoiceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}