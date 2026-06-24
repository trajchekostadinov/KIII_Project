package com.example.invoicesstripe.service.impl;

import com.example.invoicesstripe.model.Client;
import com.example.invoicesstripe.model.Invoice;
import com.example.invoicesstripe.model.InvoiceStatus;
import com.example.invoicesstripe.repository.ClientRepository;
import com.example.invoicesstripe.repository.InvoiceRepository;
import com.example.invoicesstripe.service.InvoiceService;
import com.example.invoicesstripe.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    private final StripeService stripeService;
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    public InvoiceServiceImpl(StripeService stripeService, InvoiceRepository invoiceRepository, ClientRepository clientRepository) {
        this.stripeService = stripeService;
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public List<Invoice> getByStatus(InvoiceStatus status) {
        return invoiceRepository.findByStatus(status);
    }

    @Override
    public Invoice getById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Фактурата не постои"));
    }

    @Override
    public Invoice create(Invoice invoice) {
        Client client = clientRepository.findById(invoice.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Клиентот не постои"));
        invoice.setClient(client);

        if (invoice.getStatus() == null) {
            invoice.setStatus(InvoiceStatus.DRAFT);
        }
        if (invoice.getPaymentToken() == null) {
            invoice.setPaymentToken(UUID.randomUUID().toString());
        }
        return invoiceRepository.save(invoice);
    }

    @Override
    public Invoice update(Long id, Invoice updatedInvoice) {
        Invoice existing = getById(id);
        existing.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
        existing.setAmount(updatedInvoice.getAmount());
        existing.setStatus(updatedInvoice.getStatus());
        existing.setIssueDate(updatedInvoice.getIssueDate());
        existing.setDueDate(updatedInvoice.getDueDate());
        existing.setNotes(updatedInvoice.getNotes());
        existing.setClient(updatedInvoice.getClient());
        return invoiceRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public String generatePaymentLink(Long id) throws StripeException {
        Invoice invoice = getById(id);
        if(invoice.getPaymentToken()==null){
            invoice.setPaymentToken(UUID.randomUUID().toString());
            invoiceRepository.save(invoice);
        }

        return stripeService.createCheckoutSession(invoice);
    }

    @Override
    public Invoice sendInvoice(Long id) throws StripeException {
        Invoice invoice = getById(id);
        String payment_link = generatePaymentLink(id);
        invoice.setPaymentLink(payment_link);
        invoice.setStatus(InvoiceStatus.SENT);
        return invoiceRepository.save(invoice);
    }
}