package com.example.invoicesstripe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoices")
@Data
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnoreProperties({"invoices"})
    private Client client;

    @Column(name = "invoice_number", unique = true)
    private String invoiceNumber;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status = InvoiceStatus.DRAFT;

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String notes;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"invoice"})  // ← ова го спречува infinite loop
    private List<InvoiceItem> items;
}