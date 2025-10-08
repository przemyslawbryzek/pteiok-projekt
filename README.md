# pteiok-projekt
##  Instalacja i konfiguracja projektu

###  Wymagania

* Python 3.10 lub nowszy
* Node.js 18+ i npm
* (opcjonalnie) Git

---

###  Backend (Flask)

1. Przejdź do katalogu backend:

```
cd backend
```

2. Utwórz i aktywuj wirtualne środowisko:

**macOS / Linux:**

```
python3 -m venv venv
source venv/bin/activate
```

**Windows:**

```
python -m venv venv
venv\Scripts\activate
```

3. Zainstaluj zależności:

```
pip install -r requirements.txt
```

4. Uruchom serwer:

```
python app.py
```

Domyślnie backend działa na:
[http://127.0.0.1:5000](http://127.0.0.1:5000)

---

###  Frontend (React)

1. Przejdź do katalogu frontend:

```
cd ../frontend
```

2. Zainstaluj paczki:

```
npm install
```

3. Uruchom serwer deweloperski:

```
npm run dev
```

Frontend działa na:
[http://localhost:5173](http://localhost:5173)

---

###  Struktura projektu

```
pteiok-projekt/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── package.json
│   └── ...
│
└── README.md
```
