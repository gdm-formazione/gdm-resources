# GDM Resources

Strumenti pubblici di Gente di Mare S.r.l. (simulatori d'esame e simili), pubblicati con GitHub Pages:
https://scarayaa.github.io/gdm-resources/

**Questo repo è pubblico.** Contiene solo materiale pensato per essere visto da chiunque. Dispense, fonti, kit docente e sorgenti dei corsi stanno nel repo privato `gdm-formazione` e non vanno copiati qui.

## Struttura

```
index.html                       pagina iniziale con l'elenco delle risorse
assets/                          loghi GDM (trasparente per tema chiaro, bianco per tema scuro)
simulators/<nome>/it/index.html  un simulatore, versione italiana
simulators/<nome>/en/index.html  stesso simulatore, versione inglese
.nojekyll                        GitHub Pages serve i file così come sono
```

| Risorsa | Percorso | Corso in `gdm-formazione` |
|---|---|---|
| Simulatore IECEx Unit Ex 001 | `simulators/iecex-ex001/` | `corsi/atex-iecex/` |

## Aggiungere o modificare una risorsa

- Ogni risorsa è una pagina HTML autonoma: niente build, niente dipendenze. Si modifica direttamente il file.
- Una risorsa nuova va in `simulators/<nome>/` (o in una nuova cartella di primo livello per un altro tipo di strumento), con le cartelle `it/` ed `en/`, e va aggiunta come card in `index.html` e nella tabella qui sopra.
- Ogni pagina ha in alto il link all'altra lingua (`../en/`, `../it/`) e il badge che riporta alla pagina iniziale (`../../../`).
- **IT ed EN vanno tenuti allineati**: una modifica a una lingua si riporta nell'altra. Testi EN in inglese britannico.
- Le pagine salvano i progressi in `localStorage`; tutte le pagine di `scarayaa.github.io` condividono lo stesso spazio, quindi ogni pagina usa una chiave propria (es. `iecex001_session_v1`, `iecex001_session_en_v1`).
- Font da Google Fonts; nessun altro script o risorsa esterna.

## Pubblicare

Un commit su `main` e `git push`: GitHub Pages aggiorna il sito in circa un minuto.

## Note per gli agenti (Claude Code e simili)

- Si risponde all'utente in italiano; codice e commenti del codice in inglese.
- Il repo è pubblico: non aggiungere materiale dei corsi, dati personali, segreti o file di lavoro. Nel dubbio chiedere.
- Non fare `git push` senza conferma dell'utente.
- I commit usano l'email noreply di GitHub (configurata in `.git/config` del repo).
