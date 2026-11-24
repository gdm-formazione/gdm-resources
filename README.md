# GDM Resources

Strumenti pubblici di Gente di Mare S.r.l. (simulatori d'esame e simili), pubblicati con GitHub Pages:
https://gdm-formazione.github.io/gdm-resources/

**Questo repo è pubblico.** Contiene solo materiale pensato per essere visto da chiunque. Dispense, fonti, kit docente e sorgenti dei corsi stanno nel repo privato `gdm-formazione` e non vanno copiati qui.

## Struttura

```
index.html                       pagina iniziale con l'elenco delle risorse
assets/                          loghi GDM (trasparente per tema chiaro, bianco per tema scuro)
simulators/<nome>/it/index.html  un simulatore, versione italiana
simulators/<nome>/en/index.html  stesso simulatore, versione inglese
simulators/<nome>/shared/        file comuni alle due lingue (stile, codice, banchi di domande), se il simulatore li usa
.nojekyll                        GitHub Pages serve i file così come sono
```

| Risorsa | Percorso | Corso in `gdm-formazione` |
|---|---|---|
| Simulatore IECEx Unit Ex 001 (due simulazioni: banco del corso 104 + 18, prova d'esame 66 + 20) | `simulators/iecex-ex001/` | `corsi/atex-iecex/` |

## Aggiungere o modificare una risorsa

- Ogni risorsa è HTML, CSS e JavaScript statici: niente build, niente dipendenze. Si modificano direttamente i file.
- Il simulatore Ex 001 ha le pagine `it/` ed `en/` ridotte a un guscio: l'interfaccia è in `shared/sim.js` (testi IT ed EN nell'oggetto `STR`), lo stile in `shared/sim.css` (palette e font delle presentazioni GDM), le domande in un file per banco (`shared/bank-course.js`, `shared/bank-exam.js`); il simulatore offre la scelta tra le simulazioni solo se nella pagina è caricato più di un banco. Il banco «Prova d'esame» ha come argomenti le clausole dell'IECEx OD 504 per l'unità Ex 001 e, nella modalità d'esame, estrae le domande in proporzione al peso di ogni clausola (`stratify: true`). Domande, opzioni e risposte modello sono in inglese; spiegazioni e argomenti hanno il testo `{it, en}`.
- Una risorsa nuova va in `simulators/<nome>/` (o in una nuova cartella di primo livello per un altro tipo di strumento), con le cartelle `it/` ed `en/`, e va aggiunta come card in `index.html` e nella tabella qui sopra.
- Ogni pagina ha in alto il link all'altra lingua (`../en/`, `../it/`) e il badge che riporta alla pagina iniziale (`../../../`).
- **IT ed EN vanno tenuti allineati**: una modifica a una lingua si riporta nell'altra (per il simulatore Ex 001: entrambi i campi `it` ed `en` della spiegazione e entrambe le voci di `STR`). Testi EN in inglese britannico.
- Le pagine salvano i progressi in `localStorage`; tutte le pagine di `gdm-formazione.github.io` condividono lo stesso spazio, quindi ogni pagina usa una chiave propria (es. `iecex001_session_v1` per il banco del corso e `iecex001_exam_session_v2` per la prova d'esame in italiano, con `_en_` per l'inglese). Se un banco cambia al punto che le sessioni salvate non hanno più senso, si cambia la versione nella chiave.
- Font da Google Fonts; nessun altro script o risorsa esterna.

## Pubblicare

Un commit su `main` e `git push`: GitHub Pages aggiorna il sito in circa un minuto.

## Note per gli agenti (Claude Code e simili)

- Si risponde all'utente in italiano; codice e commenti del codice in inglese.
- Il repo è pubblico: non aggiungere materiale dei corsi, dati personali, segreti o file di lavoro. Nel dubbio chiedere. Il materiale di lavoro da cui si costruiscono i banchi sta nel repo privato `gdm-formazione`, non qui; per sicurezza le cartelle `simulators/*/assets/` sono ignorate da git.
- I banchi contengono solo domande scritte da GDM sulle norme e sul materiale dei corsi: **mai domande di sessioni d'esame reali, nemmeno riformulate**, né raccolte di domande «d'esame» trovate online.
- Non fare `git push` senza conferma dell'utente.
- I commit usano l'email noreply di GitHub (configurata in `.git/config` del repo).
