INSERT INTO clients (name, email, phone, address)
VALUES ('Marko Markovski', 'marko@gmail.com', '071123456', 'Skopje'),
       ('Ana Antoska', 'ana@gmail.com', '072234567', 'Bitola'),
       ('Stefan Stefanoski', 'stefan@gmail.com', '073345678', 'Ohrid')
    ON CONFLICT DO NOTHING;

INSERT INTO invoices (client_id, invoice_number, amount, status, issue_date, due_date, notes, payment_token)
VALUES (1, 'INV-001', 500.00, 'SENT',    '2026-04-01', '2026-04-15', 'Prva faktura',   'token-uuid-001'),
       (1, 'INV-002', 150.00, 'PAID',    '2026-04-10', '2026-04-20', 'Vtora faktura',  'token-uuid-002'),
       (2, 'INV-003', 300.00, 'draft',   '2026-04-15', '2026-04-30', 'Treta faktura',  'token-uuid-003'),
       (3, 'INV-004', 750.00, 'OVERDUE', '2026-03-01', '2026-03-15', 'Zadocneta',      'token-uuid-004')
    ON CONFLICT DO NOTHING;

INSERT INTO payments (invoice_id, stripe_payment_id, amount, status, paid_at)
VALUES (2, 'pi_test_001', 150.00, 'COMPLETED', '2026-04-12 10:30:00'),
       (1, 'pi_test_002', 500.00, 'PENDING',   NULL),
       (4, 'pi_test_003', 750.00, 'FAILED',    NULL)
    ON CONFLICT DO NOTHING;
