# OrienRun (intégré à Mes Apps EPS)
Dépôt : `OrienRun` → https://vinztoc.github.io/OrienRun/ (même domaine que le portail : base d'élèves partagée).
- Départ : classe puis élève(s) (équipe possible) lus dans la liste commune. Bouton « Charger la liste » si l'appareil n'a pas encore la base.
- Fin de course : enregistrement automatique + bouton « Enregistrer dans Mes Apps EPS » → une ligne datée par élève dans la feuille `orienrun` (mode lignes : Date, Départ, Parcours, Temps, Temps (s), Balises, Réussite %, Détail balises, Équipe).
- Export : .xlsx au format Mes Apps EPS (feuilles Élèves + orienrun) ; le CSV détaillé (GPS par balise) reste disponible.
- `balises_db.js` doit être déployé avec l'application : la validité des codes est vérifiée dans le navigateur.
- Firebase, Google Fonts et CDN supprimés : aucune donnée ne quitte l'appareil. Seul le fond de carte OpenStreetMap exige une connexion.
