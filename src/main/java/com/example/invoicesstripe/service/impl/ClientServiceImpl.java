package com.example.invoicesstripe.service.impl;

import com.example.invoicesstripe.model.Client;
import com.example.invoicesstripe.repository.ClientRepository;
import com.example.invoicesstripe.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

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
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }
}