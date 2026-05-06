package com.example.invoicesstripe.service;

import com.example.invoicesstripe.model.InvoiceItem;
import org.springframework.stereotype.Service;

import java.util.List;

public interface InvoiceItemService {
    List<InvoiceItem> getByInvoiceId(Long invoiceId);
    InvoiceItem getById(Long id);
    InvoiceItem create(InvoiceItem item);
    InvoiceItem update(Long id, InvoiceItem item);
    void delete(Long id);
}
