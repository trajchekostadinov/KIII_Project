package com.example.invoicesstripe.service.impl;
import com.example.invoicesstripe.model.InvoiceItem;
import com.example.invoicesstripe.repository.InvoiceItemRepository;
import com.example.invoicesstripe.service.InvoiceItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceItemServiceImpl implements InvoiceItemService {
    private final InvoiceItemRepository invoiceItemRepository;

    public InvoiceItemServiceImpl(InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
    }

    @Override
    public List<InvoiceItem> getByInvoiceId(Long invoiceId) {
        return invoiceItemRepository.findByInvoiceId(invoiceId);
    }

    @Override
    public InvoiceItem getById(Long id) {
        return invoiceItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Ставката не постои"));
    }

    @Override
    public InvoiceItem create(InvoiceItem item) {
        return invoiceItemRepository.save(item);
    }

    @Override
    public InvoiceItem update(Long id, InvoiceItem item) {
        InvoiceItem invoice_item = getById(id);
        invoice_item.setDescription(item.getDescription());
        invoice_item.setQuantity(item.getQuantity());
        invoice_item.setUnitPrice(item.getUnitPrice());
        return invoiceItemRepository.save(invoice_item);
    }

    @Override
    public void delete(Long id) {
        invoiceItemRepository.deleteById(id);
    }
}
