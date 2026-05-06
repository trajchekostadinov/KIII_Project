package com.example.invoicesstripe.web;

import org.springframework.stereotype.Controller;
import com.example.invoicesstripe.model.InvoiceItem;
import com.example.invoicesstripe.service.InvoiceItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoice-items")
public class InvoiceItemController {
    private final InvoiceItemService invoiceItemService;

    public InvoiceItemController(InvoiceItemService invoiceItemService) {
        this.invoiceItemService = invoiceItemService;
    }

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<List<InvoiceItem>> getByInvoice(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(invoiceItemService.getByInvoiceId(invoiceId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceItemService.getById(id));
    }

    @PostMapping
    public ResponseEntity<InvoiceItem> create(@RequestBody InvoiceItem item) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceItemService.create(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceItem> update(@PathVariable Long id,
                                              @RequestBody InvoiceItem item) {
        return ResponseEntity.ok(invoiceItemService.update(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoiceItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
