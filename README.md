# Division Zeitung

**Revue d'histoire militaire spécialisée dans les archives allemandes 1939-1945**

## À propos

Division Zeitung est une revue numérique trimestrielle dédiée à l'étude approfondie des unités combattantes de l'armée allemande durant la Seconde Guerre mondiale. Basée exclusivement sur la documentation d'archives allemandes authentiques (Gliederung, Meldung, KTB, rapports de combat), elle offre une analyse rigoureuse et documentée de l'histoire militaire.

### Auteur

**Didier Laugier** - Auteur et chercheur indépendant spécialisé dans l'histoire militaire allemande 1939-1945. Plus de 20 ans de recherches et 60+ articles publiés chez les éditions Heimdal et Caraktère.

## Contenu

### Revue Division Zeitung
- **Format :** Numérique (PDF, ePub, Kindle)
- **Fréquence :** Trimestrielle (4 numéros/an)
- **Longueur :** Minimum 50 pages par numéro
- **Contenu :** Articles détaillés, cartes en couleur, documents d'archives, témoignages

Chaque numéro traite des unités combattantes allemandes :
- Panzer-Divisionen et Panzer-Grenadieren
- Sturmgeschütz-Abteilungen
- Unités d'artillerie, Flak, Pioniere, Panzerjäger
- Opérations sur tous les théâtres (Front de l'Est, Normandie, Afrique, Balkans, Italie)

### Collaborations précédentes
- **Éditions Heimdal** (depuis 2005) - 12 articles publiés
- **Éditions Caraktère** (fermée) - 50 articles dans 4 revues spécialisées

## Où trouver Division Zeitung

- **Revue en ligne :** https://divisionzeitung.github.io
- **Achat des numéros :** Via Gumroad
- **Newsletter :** Inscrivez-vous pour les nouveautés
- **Contact :** divisionzeitung@gmail.com

## Abonnement et Tarifs

| Offre | Prix | Détails |
|-------|------|---------|
| Numéro individuel | 6,00 € | Format au choix (PDF/ePub/Kindle) |
| Abonnement annuel | 20,00 € | 4 numéros + accès immédiat |

## Structure du projet

```
division-zeitung/
├── index.html                      # Page d'accueil
├── presentation.html               # À propos de l'auteur
├── articles-heimdal.html           # Archives des collaborations
├── livres-a-la-vente.html          # Boutique livres
├── livres-hors-series.html         # Publications spéciales
├── revue-division-zeitung.html     # Catalogue revues
├── newsletter.html                 # Inscription newsletter
├── contact.html                    # Formulaire de contact
│
├── styles.css                      # Styles principaux
├── legal-pages.css                 # Styles pages légales
├── script.js                       # Interactivité
│
├── pages/
│   ├── mentions.html               # Mentions légales
│   ├── confidentialite.html        # Politique de confidentialité
│   └── cgv.html                    # Conditions générales de vente
│
├── images/                         # Ressources visuelles
│   ├── logo-site.jpg
│   ├── panzer-fond.jpg
│   └── ...
│
├── robots.txt                      # Configuration robots
├── sitemap.xml                     # Plan du site
├── site.webmanifest               # Config PWA
└── README.md                       # Ce fichier
```

## Déploiement

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit - Division Zeitung"
git branch -M main
git remote add origin https://github.com/[utilisateur]/division-zeitung.git
git push -u origin main
```

Ensuite, activez GitHub Pages dans les paramètres du repository.

### Netlify (pour le formulaire de contact)
1. Connectez votre repository GitHub
2. Configurez les paramètres de build
3. Le formulaire fonctionne automatiquement avec `data-netlify="true"`

## Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation intuitive avec menus déroulants
- ✅ SEO optimisé (métadonnées, schema.org, sitemap)
- ✅ Accessible (WCAG 2.1 - skip links, aria-labels)
- ✅ Optimisé pour les moteurs de recherche
- ✅ Formulaire de contact fonctionnel
- ✅ Intégration e-commerce (Gumroad)

## Exigences techniques

- **Navigateurs supportés :** Chrome, Firefox, Safari, Edge (versions récentes)
- **Mobile first :** Optimisé pour tous les appareils
- **Hébergement :** GitHub Pages ou Netlify
- **Domaine :** Optionnel (personnalisé ou domaine gratuit)

## Informations légales

- **Propriété intellectuelle :** Tous les contenus sont protégés par le droit d'auteur
- **Politique de confidentialité :** [Voir la politique](./pages/confidentialite.html)
- **Conditions de vente :** [Voir les CGV](./pages/cgv.html)
- **Mentions légales :** [Voir les mentions](./pages/mentions.html)

## Contact

**Email :** divisionzeitung@gmail.com  
**Réponse :** Généralement sous 24-48h

### Collaborations
L'auteur est ouvert à toute collaboration ou proposition d'article.

## Licence

Tous les contenus de Division Zeitung sont la propriété intellectuelle exclusive de Didier Laugier et sont protégés par le droit d'auteur. La reproduction, distribution ou modification non autorisée est interdite.

Pour les permissions d'utilisation, contactez : divisionzeitung@gmail.com

## Crédits

- **Design & Développement :** Didier Laugier
- **Archives :** Fonds NARA et Bundesarchiv (BA)
- **Typographie :** [Inter Font](https://rsms.me/inter/)

---

**Dernière mise à jour :** 22 octobre 2025  
**Version du site :** 1.0
