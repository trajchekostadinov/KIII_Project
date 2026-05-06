    package com.example.invoicesstripe.web;

    import com.example.invoicesstripe.model.Payment;
    import com.example.invoicesstripe.model.PaymentStatus;
    import com.example.invoicesstripe.service.PaymentService;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import java.util.List;

    @RestController
    @RequestMapping("/api/payments")
    @CrossOrigin(origins = "http://localhost:5173")
    public class PaymentController {

        private final PaymentService paymentService;

        public PaymentController(PaymentService paymentService) {
            this.paymentService = paymentService;
        }

        @GetMapping
        public ResponseEntity<List<Payment>> getAll() {
            return ResponseEntity.ok(paymentService.getAll());
        }

        @GetMapping("/invoice/{invoiceId}")
        public ResponseEntity<List<Payment>> getByInvoice(@PathVariable Long invoiceId) {
            return ResponseEntity.ok(paymentService.getByInvoiceId(invoiceId));
        }

        @GetMapping("/{id}")
        public ResponseEntity<Payment> getById(@PathVariable Long id) {
            return ResponseEntity.ok(paymentService.getById(id));
        }

        @PostMapping
        public ResponseEntity<Payment> create(@RequestBody Payment payment) {
            return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.create(payment));
        }

        @PatchMapping("/{id}/status")
        public ResponseEntity<Payment> updateStatus(@PathVariable Long id,
                                                    @RequestParam PaymentStatus status) {
            return ResponseEntity.ok(paymentService.updateStatus(id, status));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id) {
            paymentService.delete(id);
            return ResponseEntity.noContent().build();
        }
    }