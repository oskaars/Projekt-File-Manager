# Projekt File Manager

Prosty i intuicyjny menedżer plików oparty na przeglądarce, zbudowany przy użyciu Node.js. Aplikacja umożliwia zarządzanie strukturą plików i katalogów bezpośrednio z poziomu interfejsu webowego.

## Funkcjonalności

Aplikacja oferuje podstawowe funkcje zarządzania systemem plików:

* **Przeglądanie plików:** Wyświetlanie listy plików i katalogów w czytelny sposób.
* **Nawigacja:** Łatwe przemieszczanie się pomiędzy katalogami.
* **Tworzenie folderów:** Możliwość tworzenia nowej struktury katalogów.
* **Zarządzanie plikami:** (W zależności od implementacji) Przesyłanie, usuwanie lub zmiana nazw plików.
* **Interfejs:** Responsywny i estetyczny interfejs użytkownika.

## Technologie

Projekt został zrealizowany przy użyciu następujących technologii:

* **Backend:** [Node.js](https://nodejs.org/)
* **Silnik szablonów:** [Handlebars (HBS)](https://handlebarsjs.com/)
* **Stylowanie:** CSS 
* **Serwer:** Express.js

## Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, postępuj zgodnie z poniższymi instrukcjami:

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/oskaars/Projekt-File-Manager.git
cd Projekt-File-Manager
````

### 2\. Instalacja zależności

Upewnij się, że masz zainstalowany Node.js, a następnie wykonaj polecenie:

```bash
npm install
```

### 3\. Uruchomienie serwera

Możesz uruchomić główny serwer za pomocą:

```bash
node server.js
```

## Struktura Projektu

  * `views/` - Szablony widoków (.hbs) odpowiedzialne za renderowanie strony.
  * `static/` - Pliki statyczne (arkusze stylów CSS, skrypty klienckie, obrazy).
  * `server.js` - Główny plik startowy serwera.
  * `package.json` - Menadżer zależności projektu.

## 👤 Autor

**Oskar Skóra**
