package com.example.invoicesstripe.repository;

import com.example.invoicesstripe.model.Invoice;
import com.example.invoicesstripe.model.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByStatus(InvoiceStatus status);
    List<Invoice> findByClient_Id(Long clientId);
    Invoice findByPaymentToken(String paymentToken);
}