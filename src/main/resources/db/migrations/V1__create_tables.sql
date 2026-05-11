CREATE TABLE IF NOT EXISTS clients
(
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(50),
    address    VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS invoices
(
    id             BIGSERIAL PRIMARY KEY,
    client_id      BIGINT           NOT NULL REFERENCES clients (id),
    invoice_number VARCHAR(255)     NOT NULL UNIQUE,
    amount         DOUBLE PRECISION,
    status         VARCHAR(50)      NOT NULL DEFAULT 'DRAFT',
    issue_date     DATE,
    due_date       DATE,
    notes          TEXT,
    payment_token  VARCHAR(255)     UNIQUE
    );


CREATE TABLE IF NOT EXISTS payments
(
    id                BIGSERIAL PRIMARY KEY,
    invoice_id        BIGINT REFERENCES invoices (id),
    stripe_payment_id VARCHAR(255),
    amount            DOUBLE PRECISION,
    status            VARCHAR(50) DEFAULT 'PENDING',
    paid_at           TIMESTAMP
    );