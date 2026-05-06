# 🧾 Invoices-Stripe App

## Апликација за креирање, управување и плаќање фактури со интеграција со Stripe.

## 📄 Опис

Оваа апликација овозможува:
- креирање фактури со податоци за клиент и износ
- испраќање линк за плаќање до корисник
- едноставно и безбедно плаќање преку Stripe
- автоматско ажурирање на статусот на фактурата

Целта е да се обезбеди лесен и брз начин за наплата со минимален интерфејс и едноставна логика.

---

## ⚙️ Технологии

- Backend: Java + Spring Boot
- Frontend: React (или друг frontend ако користиш)
- Payment: Stripe API
- Database: PostgreSQL

---

## 🧩 Функционалности

- ✅ Креирање фактура
- ✅ Генерирање уникатен линк за плаќање
- ✅ Испраќање email до клиент
- ✅ Интеграција со Stripe Checkout
- ✅ Ажурирање статус (PENDING / PAID / FAILED)

---

## 🛠️ Инсталација

### Backend

```bash
git clone https://github.com/your-username/invoices-stripe.git
cd invoices-stripe
./mvnw spring-boot:run
```
### Frontend

```bash
cd frontend
npm install
npm start
```
