package com.example.invoicesstripe.service.impl;

import com.example.invoicesstripe.model.Client;
import com.example.invoicesstripe.model.Invoice;
import com.example.invoicesstripe.repository.ClientRepository;
import com.example.invoicesstripe.repository.InvoiceRepository;
import com.example.invoicesstripe.repository.PaymentRepository;
import com.example.invoicesstripe.service.ClientService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;

    public ClientServiceImpl(ClientRepository clientRepository, InvoiceRepository invoiceRepository,PaymentRepository paymentRepository) {
        this.clientRepository = clientRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;

    }

    @Override
    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    @Override
    public Client getById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Клиентот не постои"));
    }

    @Override
    public Client create(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client update(Long id, Client updatedClient) {
        Client existing = getById(id);
        existing.setName(updatedClient.getName());
        existing.setEmail(updatedClient.getEmail());
        existing.setPhone(updatedClient.getPhone());
        existing.setAddress(updatedClient.getAddress());
        return clientRepository.save(existing);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        List<Invoice> invoices = invoiceRepository.findByClient_Id(id);
        for (Invoice invoice : invoices) {
            paymentRepository.deleteAll(paymentRepository.findByInvoiceId(invoice.getId()));
        }
        invoiceRepository.deleteAll(invoices);
        clientRepository.deleteById(id);
    }
}