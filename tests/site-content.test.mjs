import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const expectedServiceSlugs = [
  'mini-excavation-amos',
  'drain-français',
  'drainage',
  'fissure-fondation',
  'excavation-fondation',
  'terrassement-nivellement',
  'nivellement',
  'tranchee',
  'installation-septique',
  'creusage-tranchees',
  'excavation-espace-restreint'
];

describe('mini-excavation Amos local SEO site', () => {
  it('defines the target site with customer-search title and meta description', () => {
    const dataPath = join(root, 'src/data/sites.json');
    assert.equal(existsSync(dataPath), true, 'src/data/sites.json should exist');

    const sites = JSON.parse(read('src/data/sites.json'));
    const site = sites.find((entry) => entry.slug === 'mini-excavation-amos');

    assert.ok(site, 'dataset should include mini-excavation-amos');
    assert.equal(site.city, 'Amos');
    assert.equal(site.service, 'Mini-excavation résidentielle et commerciale');
    assert.equal(site.primaryKeyword, 'mini excavation Amos QC');
    assert.ok(site.secondaryKeywords.includes('mini-pelle Amos'));
    assert.equal(site.title, 'Mini-excavation à Amos');
    assert.match(site.metaDescription, /Mini-excavation à Amos/i);
    assert.match(site.metaDescription, /drainage, terrassement, fondation, nivellement et accès restreints/i);
    assert.match(site.metaDescription, /travaux possibles à la mini-pelle/i);
    assert.equal(site.language, 'fr-CA');
    assert.equal(site.phone.display, '(581) 502-0202');
    assert.equal(site.phone.href, '+15815020202');
    assert.deepEqual(site.serviceArea, ['Amos', 'Saint-Mathieu-d’Harricana', 'Saint-Félix-de-Dalquier', 'Trécesson', 'La Corne']);
    assert.equal(site.serviceArea.join(' · '), 'Amos · Saint-Mathieu-d’Harricana · Saint-Félix-de-Dalquier · Trécesson · La Corne');
    assert.equal(site.serviceArea.includes('Sainte-Marie'), false);
  });

  it('has the customer-facing Astro pages without an irrelevant privacy policy route', () => {
    assert.equal(existsSync(join(root, 'src/pages/index.astro')), true, 'home page should exist');
    assert.equal(existsSync(join(root, 'src/pages/[slug].astro')), true, 'dynamic service page should exist');
    assert.equal(existsSync(join(root, 'src/data/service-pages.json')), true, 'service page data should exist');
    assert.equal(existsSync(join(root, 'src/pages/politique-confidentialite.astro')), false, 'privacy policy page should not exist');
    assert.equal(existsSync(join(root, 'src/layouts/BaseLayout.astro')), true, 'base layout should exist');
    assert.equal(existsSync(join(root, 'public/robots.txt')), true, 'robots.txt should exist');
    assert.equal(existsSync(join(root, 'public/sitemap.xml')), true, 'sitemap.xml should exist');
    assert.match(read('public/robots.txt'), /Sitemap: https:\/\/miniexcavationamos\.ca\/sitemap\.xml/);
    assert.match(read('public/sitemap.xml'), /https:\/\/miniexcavationamos\.ca\/drain-français\//);
    assert.match(read('public/sitemap.xml'), /https:\/\/miniexcavationamos\.ca\/drainage\//);
    assert.match(read('public/sitemap.xml'), /https:\/\/miniexcavationamos\.ca\/fissure-fondation\//);
    assert.match(read('public/sitemap.xml'), /https:\/\/miniexcavationamos\.ca\/nivellement\//);
    assert.match(read('public/sitemap.xml'), /https:\/\/miniexcavationamos\.ca\/tranchee\//);
  });

  it('home page source uses the requested French contractor-tone copy', () => {
    const home = read('src/pages/index.astro');

    assert.match(home, /Mini-excavation à Amos/);
    assert.doesNotMatch(home, /Mini-excavation à Amos et en Abitibi/);
    assert.doesNotMatch(home, /Mini-pelle et mini-excavation/i);
    assert.doesNotMatch(home, /mini-pelle et mini-excavation/i);
    assert.match(home, /Des travaux propres, précis et bien faits/);
    assert.match(home, /De votre premier coup de godet jusqu'au terrain remis en ordre/);
    assert.match(home, /Votre service de mini-excavation en Abitibi/);
    assert.match(home, /De la petite tranchée au réaménagement complet de terrain/);
    assert.match(home, /Décrivez-nous votre projet/);
    assert.match(home, /Nos services de mini-excavation/);
    assert.match(home, /Mini-excavation résidentielle et commerciale/);
    assert.match(home, /Drain français/);
    assert.match(home, /href: '\/drain-français\/'/);
    assert.match(home, /Drainage de terrain/);
    assert.match(home, /href: '\/drainage\/'/);
    assert.match(home, /Fissure de fondation/);
    assert.match(home, /href: '\/fissure-fondation\/'/);
    assert.match(home, /Excavation de fondation/);
    assert.match(home, /href: '\/excavation-fondation\/'/);
    assert.match(home, /Terrassement et nivellement/);
    assert.match(home, /href: '\/terrassement-nivellement\/'/);
    assert.match(home, /Nivellement de terrain/);
    assert.match(home, /href: '\/nivellement\/'/);
    assert.match(home, /Fosse septique/);
    assert.match(home, /href: '\/installation-septique\/'/);
    assert.match(home, /Q-2, r\.22/);
    assert.doesNotMatch(home, /title: 'Installation septique'/);
    assert.match(home, /Creusage de tranchée/);
    assert.match(home, /href: '\/tranchee\/'/);
    assert.match(home, /Creusage de tranchées/);
    assert.match(home, /Excavation en espace restreint/);
    assert.match(home, /Amos et les environs/);
    assert.match(home, /sols argileux et le dégel printanier/);
    assert.match(home, /Pourquoi nous confier votre excavation/);
    assert.match(home, /Info-Excavation/);
    assert.match(home, /Comment ça fonctionne/);
    assert.match(home, /Combien coûte un projet de mini-excavation/);
    assert.match(home, /Faut-il faire quelque chose avant de creuser/);
    assert.match(home, /Préparez votre demande de soumission/);
    assert.match(home, /L'accès disponible pour la mini-pelle/);
    assert.match(home, /FAQPage/);
    assert.match(home, /Demandez une soumission gratuite/);
    assert.match(home, /Appelez/);
    assert.match(home, /tel:/);
    assert.doesNotMatch(home, /class="phone-inline"/, 'hero should not duplicate the phone link beside the button');
    assert.doesNotMatch(home, /RBQ/i, 'homepage should not mention RBQ');
    assert.doesNotMatch(home, /assur/i, 'homepage should not mention insurance');
    assert.doesNotMatch(home, /licenci/i, 'homepage should not mention licensing');
    assert.doesNotMatch(home, /Google/i, 'customer copy should not talk about Google or SEO');
    assert.doesNotMatch(home, /SEO/i, 'customer copy should not talk about SEO');
    assert.doesNotMatch(home, /site de mise en relation/i, 'homepage should not show internal lead-gen disclaimer text');
    assert.doesNotMatch(home, /Remplacer les coordonnées temporaires/i, 'homepage should not show launch placeholder text');
    assert.doesNotMatch(home, /<form/i, 'MVP is phone-only and should not collect form leads');
    assert.doesNotMatch(home, /politique-confidentialite/i, 'home page should not link to an irrelevant privacy policy');
    assert.doesNotMatch(home, /gouttières/i, 'corrected MVP should not target gutter cleaning');
  });

  it('defines one service page per core service with customer-facing text', () => {
    const pages = JSON.parse(read('src/data/service-pages.json'));
    const slugs = pages.map((page) => page.slug).sort();
    const miniPelle = pages.find((page) => page.slug === 'mini-excavation-amos');
    const newPages = {
      drainage: pages.find((page) => page.slug === 'drainage'),
      fissureFondation: pages.find((page) => page.slug === 'fissure-fondation'),
      excavationFondation: pages.find((page) => page.slug === 'excavation-fondation'),
      nivellement: pages.find((page) => page.slug === 'nivellement'),
      tranchee: pages.find((page) => page.slug === 'tranchee')
    };

    assert.deepEqual(slugs, [...expectedServiceSlugs].sort());
    assert.equal(newPages.drainage.h1, 'Drainage de terrain');
    assert.equal(newPages.fissureFondation.h1, 'Fissure de fondation');
    assert.equal(newPages.excavationFondation.h1, 'Excavation de fondation');
    assert.equal(newPages.nivellement.h1, 'Nivellement de terrain');
    assert.equal(newPages.tranchee.h1, 'Creusage de tranchée');
    assert.equal(newPages.tranchee.title, 'Creusage de tranchée');
    for (const page of Object.values(newPages)) {
      assert.ok(page.summary.length > 40, `${page.slug} should have a useful summary`);
      assert.ok(page.bullets.length >= 4, `${page.slug} should describe service details`);
      assert.ok(page.relatedLinks.length >= 2, `${page.slug} should link to related services`);
    }
    assert.equal(miniPelle.title, 'Mini-excavation résidentielle et commerciale');
    assert.equal(miniPelle.h1, 'Mini-excavation résidentielle et commerciale');
    const fosseSeptique = pages.find((page) => page.slug === 'installation-septique');
    assert.equal(fosseSeptique.title, 'Fosse septique');
    assert.equal(fosseSeptique.h1, 'Fosse septique');
    assert.match(fosseSeptique.metaDescription, /Fosse septique à Amos/i);
    assert.match(JSON.stringify(fosseSeptique), /fosse septique/i);
    assert.doesNotMatch(fosseSeptique.title, /Installation septique/i);
    assert.doesNotMatch(fosseSeptique.h1, /Installation septique/i);
    assert.match(miniPelle.metaDescription, /Travaux possibles à la mini-pelle/);
    assert.doesNotMatch(JSON.stringify(miniPelle), /Mini-pelle et mini-excavation/i);
    assert.deepEqual(miniPelle.relatedLinks.map((link) => link.href), ['/drain-français/', '/terrassement-nivellement/', '/excavation-espace-restreint/']);
    for (const page of pages) {
      assert.ok(page.title.length > 0, `${page.slug} should have a title`);
      assert.ok(page.metaDescription.length <= 170, `${page.slug} meta description should be concise`);
      assert.ok(page.h1.length > 0, `${page.slug} should have an H1`);
      assert.ok(page.body.includes('Abitibi') || page.body.includes('Amos'), `${page.slug} body should mention the local area`);
      assert.doesNotMatch(page.title, /à Amos/i, `${page.slug} title should not repeat à Amos`);
      assert.doesNotMatch(page.h1, /à Amos/i, `${page.slug} H1 should not repeat à Amos`);
      assert.doesNotMatch(page.ctaTitle || '', /à Amos/i, `${page.slug} CTA title should not repeat à Amos`);
      assert.doesNotMatch(JSON.stringify(page), /Google|SEO|site de mise en relation/i);
    }
  });

  it('drain français and terrassement pages have unique, deeper service content', () => {
    const pages = JSON.parse(read('src/data/service-pages.json'));
    const drainFrancais = pages.find((page) => page.slug === 'drain-français');
    const terrassement = pages.find((page) => page.slug === 'terrassement-nivellement');

    assert.equal(drainFrancais.title, 'Drain français | Drain de fondation');
    assert.equal(drainFrancais.h1, 'Drain français');
    assert.equal(drainFrancais.ctaTitle, "Besoin d'un drain français?");
    assert.equal(drainFrancais.metaDescription, 'Drain français et drain de fondation à Amos. Protégez vos fondations contre l’eau et l’humidité. Soumission gratuite : (581) 502-0202.');
    assert.equal(drainFrancais.h2, "Protéger vos fondations contre l'eau");
    assert.notEqual(drainFrancais.h2, drainFrancais.h1, 'drain français H2 should not duplicate H1');
    assert.match(JSON.stringify(drainFrancais), /Signes qu'un drain français est nécessaire/);
    assert.match(JSON.stringify(drainFrancais), /efflorescence/);
    assert.match(JSON.stringify(drainFrancais), /pression hydrostatique/);
    assert.match(JSON.stringify(drainFrancais), /Ce qui est inclus/);
    assert.match(JSON.stringify(drainFrancais), /Combien de temps dure un drain français/);
    assert.match(JSON.stringify(drainFrancais), /Besoin d'un drain français\?/);
    assert.deepEqual(drainFrancais.relatedLinks.map((link) => link.href), ['/excavation-fondation/', '/creusage-tranchees/']);

    assert.equal(terrassement.title, 'Terrassement et nivellement | Correction de pente');
    assert.equal(terrassement.h1, 'Terrassement et nivellement');
    assert.doesNotMatch(drainFrancais.h1, /à Amos/);
    assert.doesNotMatch(drainFrancais.title, /à Amos/);
    assert.doesNotMatch(drainFrancais.ctaTitle, /à Amos/);
    assert.doesNotMatch(terrassement.h1, /à Amos/);
    assert.doesNotMatch(terrassement.title, /à Amos/);
    assert.equal(terrassement.metaDescription, 'Terrassement, nivellement et correction de pente à Amos avec une mini-pelle. Préparez et stabilisez votre terrain. Soumission gratuite : (581) 502-0202.');
    assert.equal(terrassement.h2, 'Un terrain bien nivelé, une eau bien dirigée');
    assert.notEqual(terrassement.h2, terrassement.h1, 'terrassement H2 should not duplicate H1');
    assert.match(JSON.stringify(terrassement), /Quand faire un terrassement/);
    assert.match(JSON.stringify(terrassement), /terrain bosselé difficile à utiliser/);
    assert.match(JSON.stringify(terrassement), /mini-pelle/);
    assert.match(JSON.stringify(terrassement), /Ce qui est inclus/);
    assert.match(JSON.stringify(terrassement), /Corrigez-vous une pente qui envoie l'eau vers ma maison/);
    assert.match(JSON.stringify(terrassement), /Un terrain à niveler ou une pente à corriger/);
    assert.deepEqual(terrassement.relatedLinks.map((link) => link.href), ['/drain-français/', '/excavation-fondation/']);

    for (const page of [drainFrancais, terrassement]) {
      const text = [page.summary, page.body, ...(page.sections || []).flatMap((section) => [section.heading, ...(section.paragraphs || []), ...(section.items || [])]), ...(page.faqs || []).flatMap((faq) => [faq.question, faq.answer])].join(' ');
      assert.ok(text.split(/\s+/).length >= 350, `${page.slug} should have at least 350 words of unique content`);
      assert.ok(text.split(/\s+/).length <= 550, `${page.slug} should stay focused under 550 words`);
      assert.doesNotMatch(text, /Discutez de l’accès au chantier, du délai souhaité/i);
      assert.doesNotMatch(text, /Les travaux d’excavation en Abitibi doivent tenir compte/i);
      assert.doesNotMatch(text, /Besoin de ce service\?/i);
    }
  });

  it('service page template uses phone-only CTAs, linked services, unique sections and no duplicate generic blocks', () => {
    const template = read('src/pages/[slug].astro');

    assert.match(template, /id="soumission"/);
    assert.doesNotMatch(template, /<form/i, 'service pages should not collect form leads');
    assert.doesNotMatch(template, /data-netlify="true"/i, 'phone-only site should not include Netlify forms');
    assert.doesNotMatch(template, /<input/i, 'phone-only site should not include form fields');
    assert.doesNotMatch(template, /<textarea/i, 'phone-only site should not include form fields');
    assert.match(template, /<p class="eyebrow">\{page\.eyebrow\}<\/p>/);
    assert.doesNotMatch(template, /\{page\.eyebrow\} · Abitibi/);
    assert.match(template, /href={`tel:\$\{site\.phone\.href\}`}>Appelez pour une soumission gratuite/);
    assert.doesNotMatch(template, /class="phone-inline"/, 'service hero should not duplicate the phone link beside the button');
    assert.match(template, /href={`tel:\$\{site\.phone\.href\}`}>Appelez \{site\.phone\.display\}/);
    assert.match(template, /relatedLinks\.map/);
    assert.match(template, /FAQPage/);
    assert.match(template, /faqJsonLd/);
    assert.doesNotMatch(template, /<img/i, 'service pages should not show stock photos');
    assert.doesNotMatch(template, /Photo de chantier/);
    assert.doesNotMatch(template, /photo\.credit/);
    assert.match(template, /<aside class="card cta-card" aria-label="Soumission rapide">/);
    assert.match(template, /Réponse rapide/);
    assert.match(template, /Parlez-nous de votre chantier/);
    assert.doesNotMatch(template, /<h2>\{page\.title\}<\/h2>/);
    assert.doesNotMatch(template, /Amos et région de Abitibi/);
    assert.doesNotMatch(template, /Un service adapté aux propriétés de Amos/);
    assert.doesNotMatch(template, /Besoin de ce service\?/);
  });

  it('layout navigation and footer stay customer-facing', () => {
    const layout = read('src/layouts/BaseLayout.astro');

    assert.match(layout, /<a href="\/#services">Services<\/a>/);
    assert.match(layout, /<a href="\/#secteurs">Secteurs desservis<\/a>/);
    assert.doesNotMatch(layout, /href="\/drain-français\/"/);
    assert.doesNotMatch(layout, /href="\/terrassement-nivellement\/"/);
    assert.match(layout, /Mini-Excavation Amos — drainage, terrassement, fondation et nivellement\./);
    assert.doesNotMatch(layout, /dans la Abitibi/);
    assert.doesNotMatch(layout, /Licence RBQ/);
    assert.doesNotMatch(layout, /Assuré/);
    assert.doesNotMatch(layout, /Téléphone :/);
    assert.doesNotMatch(layout, /phoneDisplay/);
    assert.match(layout, /© 2026 Mini-Excavation Amos\. Tous droits réservés\./);
    assert.doesNotMatch(layout, /politique-confidentialite/i);
    assert.doesNotMatch(layout, /Confidentialité/i);
    assert.doesNotMatch(layout, /site de mise en relation/i);
    assert.doesNotMatch(layout, /Google/i);
    assert.doesNotMatch(layout, /SEO/i);
    assert.doesNotMatch(layout, /Remplacer les coordonnées temporaires/i);
  });
});
