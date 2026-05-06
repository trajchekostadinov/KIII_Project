package com.example.invoicesstripe.service;

import com.example.invoicesstripe.model.Payment;
import com.example.invoicesstripe.model.PaymentStatus;

import java.util.List;

public interface PaymentService {
    List<Payment> getAll();
    List<Payment> getByInvoiceId(Long invoiceId);
    Payment getById(Long id);
    Payment create(Payment payment);
    Payment updateStatus(Long id, PaymentStatus status);
    void delete(Long id);
}
