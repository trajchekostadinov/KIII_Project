package com.example.invoicesstripe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoice_items")
@Data
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Invoice invoice;

    private String description;
    private Integer quantity;

    @Column(name = "unit_price")
    private Double unitPrice;
}