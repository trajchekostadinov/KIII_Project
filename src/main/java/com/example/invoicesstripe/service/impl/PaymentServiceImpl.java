package com.example.invoicesstripe.service.impl;

import com.example.invoicesstripe.model.Payment;
import com.example.invoicesstripe.model.PaymentStatus;
import com.example.invoicesstripe.repository.PaymentRepository;
import com.example.invoicesstripe.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getByInvoiceId(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId);
    }

    @Override
    public Payment getById(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Плаќањето не постои"));
    }

    @Override
    public Payment create(Payment payment) {
        if (payment.getStatus() == null) {   // ako ne e praten status, postavi go na pending...
            payment.setStatus(PaymentStatus.PENDING);
        }
        return paymentRepository.save(payment);
    }

    @Override
    public Payment updateStatus(Long id, PaymentStatus status) {
        Payment existing = getById(id);
        existing.setStatus(status);
        return paymentRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
            paymentRepository.deleteById(id);
    }
}
