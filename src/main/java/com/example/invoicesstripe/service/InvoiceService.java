package com.example.invoicesstripe.service;
import com.stripe.exception.StripeException;

import com.example.invoicesstripe.model.Invoice;
import com.example.invoicesstripe.model.InvoiceStatus;
import java.util.List;

public interface InvoiceService {
    List<Invoice> getAll();
    List<Invoice> getByStatus(InvoiceStatus status);
    Invoice getById(Long id);
    Invoice create(Invoice invoice);
    Invoice update(Long id, Invoice invoice);
    void delete(Long id);
    String generatePaymentLink(Long id) throws StripeException;
    Invoice sendInvoice(Long id) throws StripeException;
}
