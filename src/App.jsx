import { useEffect, useRef, useState } from "react";

import {
  Leaf,
  Award,
  BookOpen,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  MapPin,
  ChevronDown,
  TrendingUp,
  Globe,
} from "lucide-react";
/* ─── FONTS (Google Fonts via @import) ────────────────────────────────────── */
const fontStyle = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream: #F5F0E8;
  --warm-white: #FAFAF7;
  --earth: #2C2416;
  --earth-mid: #4A3728;
  --earth-light: #8B6F4E;
  --sage: #5C7A5A;
  --sage-light: #8AAE85;
  --sage-pale: #E8F0E5;
  --gold: #C4922A;
  --gold-light: #E8C97A;
  --charcoal: #1A1A1A;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--warm-white);
  color: var(--earth);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 2px; }

/* ─── Animations ─── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes lineGrow {
  from { scaleX: 0; } to { scaleX: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  30% { transform: translate(3%, -1%); }
  50% { transform: translate(-1%, 4%); }
  70% { transform: translate(4%, 2%); }
  90% { transform: translate(-3%, -2%); }
}
@keyframes counterUp {
  from { opacity: 0; transform: translateY(20px) scale(0.8); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-fade-up   { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
.animate-fade-in   { animation: fadeIn 1.2s ease both; }
.animate-scale-in  { animation: scaleIn 0.9s cubic-bezier(0.16,1,0.3,1) both; }
.animate-slide-r   { animation: slideRight 0.8s cubic-bezier(0.16,1,0.3,1) both; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }
.float-anim { animation: float 6s ease-in-out infinite; }

/* ─── Grain overlay ─── */
.grain::after {
  content: '';
  position: fixed; inset: -50%;
  width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.025;
  pointer-events: none;
  z-index: 9999;
  animation: grain 8s steps(10) infinite;
}

/* ─── Nav ─── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 0 5%;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
  transition: all 0.4s;
}
nav.scrolled {
  background: rgba(250,250,247,0.88);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(92,122,90,0.12);
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 600;
  color: var(--earth); letter-spacing: 0.02em;
  text-decoration: none;
}
.nav-logo span { color: var(--sage); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a {
  font-family: var(--font-body); font-size: 0.8rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--earth-mid); text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--sage); }
.nav-cta {
  padding: 0.5rem 1.4rem;
  background: var(--earth); color: var(--cream);
  font-family: var(--font-body); font-size: 0.78rem;
  font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
  border: none; cursor: pointer;
  border-radius: 100px;
  transition: all 0.3s;
}
.nav-cta:hover { background: var(--sage); transform: translateY(-1px); }

/* ─── Hero ─── */
.hero {
  min-height: 100vh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 100px 5% 0;
  gap: 4rem;
  position: relative;
  overflow: hidden;
}
.hero-text { position: relative; z-index: 2; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-body); font-size: 0.72rem;
  font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--sage); margin-bottom: 1.5rem;
}
.hero-eyebrow::before {
  content: ''; display: block;
  width: 28px; height: 1px; background: var(--sage);
}
.hero-h1 {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 6vw, 5.2rem);
  font-weight: 300; line-height: 1.06;
  color: var(--earth); margin-bottom: 1.8rem;
  letter-spacing: -0.01em;
}
.hero-h1 em { font-style: italic; color: var(--sage); }
.hero-sub {
  font-family: var(--font-body); font-size: 1rem;
  font-weight: 300; line-height: 1.8;
  color: var(--earth-mid); max-width: 440px;
  margin-bottom: 2.5rem;
}
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 0.9rem 2rem;
  background: var(--earth); color: var(--cream);
  font-family: var(--font-body); font-size: 0.85rem; font-weight: 500;
  letter-spacing: 0.04em;
  border: none; border-radius: 100px; cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  text-decoration: none;
}
.btn-primary:hover { background: var(--sage); transform: translateY(-2px); box-shadow: 0 12px 28px rgba(92,122,90,0.3); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 0.9rem 2rem;
  background: transparent;
  border: 1px solid rgba(44,36,22,0.25);
  color: var(--earth);
  font-family: var(--font-body); font-size: 0.85rem; font-weight: 500;
  border-radius: 100px; cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}
.btn-outline:hover { border-color: var(--sage); color: var(--sage); }

.hero-img-wrap {
  position: relative; height: 580px;
  border-radius: 24px; overflow: hidden;
}
.hero-img-wrap img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 8s ease;
}
.hero-img-wrap:hover img { transform: scale(1.04); }
.hero-badge {
  position: absolute; bottom: 2rem; left: 2rem; right: 2rem;
  background: rgba(250,250,247,0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(92,122,90,0.2);
  border-radius: 16px; padding: 1rem 1.4rem;
  display: flex; align-items: center; gap: 12px;
}
.hero-badge-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--sage-pale);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.hero-badge-text strong {
  display: block; font-family: var(--font-display);
  font-size: 1rem; font-weight: 600; color: var(--earth);
}
.hero-badge-text span {
  font-size: 0.75rem; color: var(--earth-light);
}
.hero-bg-shape {
  position: absolute; top: -20%; right: -10%;
  width: 60%; height: 120%;
  background: radial-gradient(ellipse at center, rgba(232,240,229,0.6) 0%, transparent 70%);
  pointer-events: none;
}

/* ─── Stats bar ─── */
.stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr);
  background: var(--earth); padding: 3rem 5%;
  gap: 1px;
}
.stat-item {
  text-align: center; padding: 0 2rem;
  border-right: 1px solid rgba(255,255,255,0.08);
}
.stat-item:last-child { border-right: none; }
.stat-num {
  font-family: var(--font-display);
  font-size: 3rem; font-weight: 600;
  color: var(--gold-light); line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-label {
  font-family: var(--font-body); font-size: 0.78rem;
  font-weight: 400; letter-spacing: 0.06em;
  text-transform: uppercase; color: rgba(245,240,232,0.5);
}

/* ─── Section commons ─── */
.section { padding: 6rem 5%; }
.section-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-body); font-size: 0.7rem;
  font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--sage); margin-bottom: 1rem;
}
.section-tag::before {
  content: ''; display: block;
  width: 20px; height: 1px; background: var(--sage);
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 300; line-height: 1.12;
  color: var(--earth); margin-bottom: 1.2rem;
}
.section-title em { font-style: italic; color: var(--sage); }
.section-body {
  font-family: var(--font-body); font-size: 0.95rem;
  font-weight: 300; line-height: 1.85;
  color: var(--earth-mid); max-width: 520px;
}

/* ─── About / Proyecto ─── */
.about-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: center;
}
.about-img-stack { position: relative; height: 520px; }
.about-img-main {
  position: absolute; top: 0; left: 0;
  width: 78%; height: 82%;
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 32px 64px rgba(44,36,22,0.18);
}
.about-img-main img { width: 100%; height: 100%; object-fit: cover; }
.about-img-secondary {
  position: absolute; bottom: 0; right: 0;
  width: 56%; height: 52%;
  border-radius: 16px; overflow: hidden;
  border: 4px solid var(--warm-white);
  box-shadow: 0 20px 40px rgba(44,36,22,0.14);
}
.about-img-secondary img { width: 100%; height: 100%; object-fit: cover; }
.ods-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
.ods-chip {
  padding: 0.3rem 0.9rem;
  background: var(--sage-pale); color: var(--sage);
  font-family: var(--font-body); font-size: 0.72rem;
  font-weight: 500; letter-spacing: 0.04em;
  border-radius: 100px; border: 1px solid rgba(92,122,90,0.2);
}

/* ─── Services / Cursos ─── */
.courses-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1.5px; background: rgba(44,36,22,0.08);
  border: 1px solid rgba(44,36,22,0.08);
  border-radius: 24px; overflow: hidden;
  margin-top: 3rem;
}
.course-card {
  background: var(--warm-white); padding: 2.5rem 2rem;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  cursor: pointer; position: relative; overflow: hidden;
}
.course-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--sage), var(--gold));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.course-card:hover { background: var(--cream); transform: translateY(-4px); }
.course-card:hover::before { transform: scaleX(1); }
.course-icon {
  width: 48px; height: 48px;
  background: var(--sage-pale); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.5rem; color: var(--sage);
}
.course-level {
  font-family: var(--font-body); font-size: 0.65rem;
  font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--earth-light); margin-bottom: 0.6rem;
}
.course-name {
  font-family: var(--font-display); font-size: 1.3rem;
  font-weight: 600; color: var(--earth);
  line-height: 1.25; margin-bottom: 0.8rem;
}
.course-desc {
  font-size: 0.82rem; font-weight: 300;
  color: var(--earth-mid); line-height: 1.7;
  margin-bottom: 1.5rem;
}
.course-meta {
  display: flex; gap: 1rem;
  font-size: 0.72rem; color: var(--earth-light);
}
.course-price {
  font-family: var(--font-display);
  font-size: 1.6rem; font-weight: 600;
  color: var(--earth); margin-top: auto;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(44,36,22,0.08);
}
.course-clabe {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(232,240,229,0.7);
  border: 1px solid rgba(92,122,90,0.16);
  border-radius: 14px;
}
.course-clabe-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 0.45rem;
}
.course-clabe-value {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--earth);
  overflow-wrap: anywhere;
}
.course-clabe-note {
  margin-top: 0.5rem;
  font-size: 0.72rem;
  line-height: 1.5;
  color: var(--earth-light);
}

/* ─── Bento impacto ─── */
.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 12px; margin-top: 3rem;
}
.bento-card {
  background: var(--cream); border-radius: 20px;
  padding: 2rem; position: relative; overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.bento-card:hover { transform: translateY(-4px); }
.bento-card.wide  { grid-column: span 2; }
.bento-card.dark  { background: var(--earth); color: var(--cream); }
.bento-card.green { background: var(--sage); color: var(--cream); }
.bento-card.gold  { background: var(--gold); color: var(--earth); }
.bento-num {
  font-family: var(--font-display);
  font-size: 4rem; font-weight: 600; line-height: 1;
  margin-bottom: 0.4rem; letter-spacing: -0.02em;
}
.bento-label {
  font-size: 0.78rem; font-weight: 400;
  letter-spacing: 0.06em; text-transform: uppercase;
  opacity: 0.65;
}
.bento-title {
  font-family: var(--font-display); font-size: 1.6rem;
  font-weight: 400; line-height: 1.25;
  margin-bottom: 0.8rem;
}
.bento-body { font-size: 0.82rem; font-weight: 300; line-height: 1.75; opacity: 0.8; }
.bento-icon { margin-bottom: 1rem; opacity: 0.7; }
.bento-img {
  position: absolute; bottom: 0; right: 0;
  width: 55%; height: 75%;
  object-fit: cover; border-radius: 12px 0 0 0;
  opacity: 0.25;
}

/* ─── Team ─── */
.team-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; margin-top: 3rem;
}
.team-card {
  background: var(--cream); border-radius: 20px;
  padding: 2rem; text-align: center;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  border: 1px solid transparent;
}
.team-card:hover {
  transform: translateY(-6px);
  border-color: rgba(92,122,90,0.2);
  background: var(--warm-white);
  box-shadow: 0 20px 40px rgba(44,36,22,0.08);
}
.team-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--sage-pale);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  font-family: var(--font-display); font-size: 1.4rem;
  font-weight: 600; color: var(--sage);
  border: 3px solid rgba(92,122,90,0.15);
}
.team-name {
  font-family: var(--font-display); font-size: 1rem;
  font-weight: 600; color: var(--earth); margin-bottom: 0.3rem;
}
.team-role {
  font-size: 0.72rem; font-weight: 400;
  letter-spacing: 0.04em; color: var(--earth-light);
}

.users-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}
.users-stat {
  background: var(--warm-white);
  border: 1px solid rgba(44,36,22,0.08);
  border-radius: 18px;
  padding: 1.5rem;
}
.users-stat-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
  color: var(--earth);
  margin-bottom: 0.4rem;
}
.users-stat-label {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--earth-light);
}
.users-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1.2rem;
}
.user-card {
  min-height: 320px;
  background: var(--warm-white);
  border: 1px solid rgba(44,36,22,0.08);
  border-radius: 20px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.user-card:hover {
  transform: translateY(-5px);
  border-color: rgba(92,122,90,0.22);
  box-shadow: 0 20px 40px rgba(44,36,22,0.08);
}
.user-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--sage-pale);
  color: var(--sage);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  flex-shrink: 0;
}
.user-name {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--earth);
  line-height: 1.2;
}
.user-location {
  display: block;
  margin-top: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--earth-light);
}
.user-profile {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 0.7rem;
}
.user-summary {
  font-size: 0.82rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--earth-mid);
  margin-bottom: 1rem;
}
.user-meta {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.32rem 0.65rem;
  border-radius: 999px;
  background: var(--cream);
  color: var(--earth-light);
  font-size: 0.68rem;
  font-weight: 500;
}
.progress-track {
  width: 100%;
  height: 8px;
  background: var(--sage-pale);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.35rem;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sage), var(--gold));
  border-radius: inherit;
}
.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.status-pill.done {
  color: var(--sage);
  background: var(--sage-pale);
}
.status-pill.pending {
  color: var(--gold);
  background: rgba(196,146,42,0.14);
}
.user-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
.user-detail-card {
  scroll-margin-top: 90px;
  background: var(--cream);
  border: 1px solid rgba(44,36,22,0.08);
  border-radius: 20px;
  padding: 1.8rem;
}
.user-detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.user-detail-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--earth);
  line-height: 1.2;
}
.user-detail-subtitle {
  margin-top: 0.35rem;
  font-size: 0.76rem;
  color: var(--earth-light);
}
.user-detail-body {
  font-size: 0.86rem;
  line-height: 1.75;
  font-weight: 300;
  color: var(--earth-mid);
}
.user-detail-list {
  display: grid;
  gap: 0.45rem;
  margin-top: 1rem;
}
.user-detail-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.76rem;
  color: var(--earth-mid);
}

/* ─── CTA ─── */
.cta-section {
  margin: 0 5% 6rem;
  border-radius: 28px; overflow: hidden;
  background: var(--earth);
  padding: 5rem 5%;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  position: relative;
}
.cta-section::before {
  content: '';
  position: absolute; inset: 0;
  background: url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=60') center/cover;
  opacity: 0.08;
}
.cta-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 300; line-height: 1.12;
  color: var(--cream); position: relative;
}
.cta-title em { font-style: italic; color: var(--gold-light); }
.cta-right { position: relative; }
.cta-body {
  font-size: 0.9rem; font-weight: 300;
  line-height: 1.8; color: rgba(245,240,232,0.65);
  margin-bottom: 2rem;
}

/* ─── Footer ─── */
footer {
  background: var(--charcoal);
  padding: 4rem 5% 2rem;
  color: rgba(245,240,232,0.6);
}
.footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem; padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 2rem;
}
.footer-brand {
  font-family: var(--font-display); font-size: 1.4rem;
  font-weight: 600; color: var(--cream); margin-bottom: 0.8rem;
}
.footer-brand span { color: var(--sage-light); }
.footer-desc { font-size: 0.8rem; line-height: 1.8; max-width: 260px; }
.footer-heading {
  font-size: 0.68rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(245,240,232,0.35); margin-bottom: 1.2rem;
}
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 0.6rem; }
.footer-links a {
  font-size: 0.82rem; color: rgba(245,240,232,0.55);
  text-decoration: none; transition: color 0.2s;
}
.footer-links a:hover { color: var(--sage-light); }
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.72rem;
}
.footer-ods {
  display: flex; gap: 8px;
}
.ods-dot {
  width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.6rem; font-weight: 700; color: white;
}

/* ─── Ticker ─── */
.ticker-wrap {
  overflow: hidden; background: var(--sage);
  padding: 0.7rem 0; white-space: nowrap;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.ticker-inner {
  display: inline-block;
  animation: ticker 28s linear infinite;
  font-family: var(--font-body); font-size: 0.72rem;
  font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.85);
}
.ticker-sep { display: inline-block; margin: 0 2rem; opacity: 0.4; }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; padding-top: 90px; }
  .hero-img-wrap { height: 360px; }
  .hero-bg-shape { display: none; }
  .about-grid, .cta-section { grid-template-columns: 1fr; }
  .about-img-stack { height: 340px; }
  .courses-grid { grid-template-columns: 1fr; }
  .users-summary { grid-template-columns: 1fr; }
  .users-grid, .user-details-grid { grid-template-columns: 1fr; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .bento { grid-template-columns: 1fr; }
  .bento-card.wide { grid-column: span 1; }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-top { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 600px) {
  .stats-bar { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .footer-top { grid-template-columns: 1fr; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const team = [
  { name: "Dr. José Luis Hernández", role: "Director Académico", init: "JL" },
  { name: "Elena de Villa Goytia", role: "Coordinación de Proyectos", init: "EV" },
  { name: "Jesús Daniel Bárcena", role: "Sistemas Agrosilvopastoriles", init: "JD" },
  { name: "Aída Beristain Delgado", role: "Impacto Ambiental", init: "AB" },
  { name: "Argenis Aragón López", role: "Tecnología & Plataforma", init: "AA" },
];

const cursos = [
  {
    nivel: "Introducción", icon: BookOpen, color: "#5C7A5A",
    name: "Fundamentos de Ganadería Regenerativa",
    desc: "Sensibilización en pastoreo rotacional, ciclo del carbono y manejo holístico del suelo. Disponible en formato digital (YouTube).",
    horas: "12 h", modulos: "6 módulos", precio: "Gratis",
    temas: ["Ecología de pastizales", "Ciclo del carbono", "Diagnóstico de suelos", "Manejo holístico"],
  },
  {
    nivel: "Avanzado", icon: TrendingUp, color: "#C4922A",
    name: "Diseño de Sistemas de Pastoreo Rotacional",
    desc: "Talleres presenciales en rancho. Diseño de potreros, cálculo de biomasa, análisis costo-beneficio y acompañamiento técnico.",
    horas: "24 h", modulos: "10 módulos", precio: "Gratis",
    temas: ["Planificación de potreros", "Biomasa y carga", "Análisis financiero", "Registros productivos"],
  },
  {
    nivel: "Certificación", icon: Award, color: "#2C2416",
    name: "Certificación Profesional Regenerativa",
    desc: "Programa integral con proyecto final, integración a cooperativa y certificado avalado. Acceso a red de productores y mercados sostenibles.",
    horas: "40 h", modulos: "16 módulos", precio: "$3,907.50 MXN",
    temas: ["Diseño integral de finca", "Trazabilidad de carne", "Cert. orgánica", "Red cooperativa"],
  },
];

const usuarios = [
  {
    id: "rancho-la-marina",
    nombre: 'Rancho "La Marina"',
    iniciales: "LM",
    perfil: "Desconocimiento del modelo",
    ubicacion: "Productores bovinos",
    curso: "Certificacion Profesional Regenerativa",
    fecha: "Validado en entrevista",
    avance: 100,
    completo: true,
    resumen: "Criadores de bovinos por inseminacion. Al inicio desconocian la ganaderia regenerativa y como producir con menor impacto ambiental.",
    detalle: "El acercamiento fue respetuoso, aunque inicialmente no mostraron interes en el taller porque no conocian el termino ganaderia regenerativa. El diagnostico confirma una oportunidad clara de sensibilizacion: explicar beneficios productivos, reduccion de impacto ambiental y rutas de adopcion gradual.",
    puntos: ["Cria de ganado bovino por inseminacion", "Venta de raza y cortes de carne", "Necesitan introduccion al modelo regenerativo"],
  },
  {
    id: "sierra-puebla",
    nombre: "Productores de la Sierra de Puebla",
    iniciales: "SP",
    perfil: "Receptividad y validacion",
    ubicacion: "Sierra de Puebla",
    curso: "Certificacion Profesional Regenerativa",
    fecha: "Validado en entrevista",
    avance: 100,
    completo: true,
    resumen: "Productores bovinos con manejo intensivo y pastoreo rotativo ocasional. Validaron el proyecto y destacaron la falta de agua como reto principal.",
    detalle: "La respuesta fue muy positiva: comprendieron el enfoque del proyecto, lo calificaron como excelente y se perfilan como candidatos ideales para implementar practicas regenerativas. Su principal desafio climatico actual es la escasez de agua.",
    puntos: ["Bovinos por inseminacion", "Pastoreo rotativo ocasional", "Alta disposicion para implementar el modelo"],
  },
  {
    id: "alfredo-justo-estudillo",
    nombre: "Alfredo Justo Estudillo",
    iniciales: "AJ",
    perfil: "Enfoque practico",
    ubicacion: "Amozoc, Puebla",
    curso: "Certificacion Profesional Regenerativa",
    fecha: "Validado en entrevista",
    avance: 100,
    completo: true,
    resumen: "Productor joven de ovinos Hampshire. Ya aplica practicas compatibles y quiere fortalecer su manejo con nuevos conocimientos.",
    detalle: "Alfredo identifica el calentamiento global y la falta de planeacion como desafios clave. Considera valiosa la iniciativa, pero subraya que el reto real es implementarla y evitar que se quede solo en planes. Mostro gran interes en integrarse al taller.",
    puntos: ["Ovinos Hampshire con y sin registro", "Participa en UNO y AGLOVT", "Interes alto en formacion e implementacion"],
  },
  {
    id: "productos-premium",
    nombre: "Huevos y Embutidos Premium",
    iniciales: "HP",
    perfil: "Escepticismo regulatorio",
    ubicacion: "Alta regulacion",
    curso: "Certificacion Profesional Regenerativa",
    fecha: "Validado en entrevista",
    avance: 100,
    completo: true,
    resumen: "Productor de huevos organicos, carnes frias y embutidos premium. Su operacion prioriza inocuidad, calidad y trazabilidad.",
    detalle: "El perfil fue esceptico ante una transicion 100% regenerativa por los lineamientos de SAGARPA, SENASICA, EMA y UVSA. Percibe riesgos sanitarios y aumento de costos, por lo que requiere una ruta compatible con inocuidad antes de adoptar nuevas certificaciones.",
    puntos: ["Modelo sujeto a normas de inocuidad", "Prioriza trazabilidad y control sanitario", "Requiere propuesta gradual y compatible"],
  },
];

const usuariosCompletos = usuarios.filter((u) => u.completo).length;
const usuariosPendientes = usuarios.length - usuariosCompletos;

const images = {
  hero: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80",
  about1: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=700&q=80",
  about2: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80",
};

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────────────*/
function Counter({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60, step = duration / steps;
        let i = 0;
        const t = setInterval(() => {
          i++;
          setVal(Math.round((end / steps) * i));
          if (i >= steps) { setVal(end); clearInterval(t); }
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <span ref={ref} style={{ animation: "counterUp 0.6s ease both" }}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── SCROLL REVEAL ──────────────────────────────────────────────────────────*/
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────────*/
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{fontStyle}</style>
      <div className="grain">

        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <nav className={scrolled ? "scrolled" : ""}>
          <a className="nav-logo" onClick={() => scrollTo("inicio")} style={{ cursor: "pointer" }}>
            GR<span>Pro</span>
          </a>
          <ul className="nav-links">
            {[["inicio","Inicio"],["proyecto","Proyecto"],["cursos","Cursos"],["usuarios","Usuarios"],["impacto","Impacto"],["equipo","Equipo"]].map(([id,label]) => (
              <li key={id}><a onClick={() => scrollTo(id)} style={{ cursor: "pointer" }}>{label}</a></li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => scrollTo("cursos")}>Inscribirse</button>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section id="inicio" className="hero">
          <div className="hero-bg-shape" />
          <div className="hero-text">
            <div className="hero-eyebrow animate-slide-r">Cooperativa · Puebla, México</div>
            <h1 className="hero-h1 animate-fade-up delay-100">
              El campo que<br/><em>regenera</em><br/>la vida
            </h1>
            <p className="hero-sub animate-fade-up delay-200">
              Capacitación técnica y acompañamiento personalizado para la transición hacia modelos de ganadería regenerativa. Desde Puebla hacia todo México.
            </p>
            <div className="hero-actions animate-fade-up delay-300">
              <a className="btn-primary" onClick={() => scrollTo("cursos")}>
                Ver Cursos <ArrowRight size={16} />
              </a>
              <a className="btn-outline" onClick={() => scrollTo("proyecto")}>
                <Play size={14} /> Conocer el Proyecto
              </a>
            </div>
          </div>
          <div className="hero-img-wrap animate-scale-in delay-200">
            <img src={images.hero} alt="Ganadería regenerativa en México" />
            <div className="hero-badge">
              <div className="hero-badge-icon"><Leaf size={20} color="#5C7A5A" /></div>
              <div className="hero-badge-text">
                <strong>Alineado con ODS 2030</strong>
                <span>ODS 2 · 12 · 13 · 15 — Agenda 2030</span>
              </div>
            </div>
          </div>
          <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", opacity:0.4 }}>
            <span style={{ fontSize:"0.65rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--earth-mid)" }}>Explorar</span>
            <ChevronDown size={16} color="var(--earth-mid)" style={{ animation:"float 2s ease-in-out infinite" }} />
          </div>
        </section>

        {/* ── TICKER ────────────────────────────────────────────────────── */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(6).fill(null).map((_, i) => (
              <span key={i}>
                Ganadería Regenerativa <span className="ticker-sep">·</span>
                Pastoreo Rotacional <span className="ticker-sep">·</span>
                Captura de Carbono <span className="ticker-sep">·</span>
                Sistemas Agrosilvopastoriles <span className="ticker-sep">·</span>
                Cooperativa Productores <span className="ticker-sep">·</span>
                Puebla · México <span className="ticker-sep">◆</span>&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS BAR ────────────────────────────────────────────────── */}
        <div className="stats-bar">
          {[
            { num: 39.7, suffix: "%", label: "del PIB agropecuario nacional — ganadería", src:"SADER 2025" },
            { num: 28600, suffix: "", label: "hectáreas potenciales en Puebla" },
            { num: 892,   suffix: "+", label: "productores en transición regenerativa" },
            { num: 6,     suffix: "",  label: "competidores directos analizados" },
          ].map((s, i) => (
            <Reveal key={i} className="stat-item" delay={i * 0.1}>
              <p className="stat-num"><Counter end={s.num} suffix={s.suffix} /></p>
              <p className="stat-label">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* ── PROYECTO ──────────────────────────────────────────────────── */}
        <section id="proyecto" className="section" style={{ background:"var(--warm-white)" }}>
          <div className="about-grid">
            <Reveal>
              <div className="about-img-stack">
                <div className="about-img-main float-anim">
                  <img src={images.about1} alt="Pastoreo rotacional" />
                </div>
                <div className="about-img-secondary">
                  <img src={images.about2} alt="Suelo regenerativo" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="section-tag">Sobre el Proyecto</div>
              <h2 className="section-title">Una cooperativa que<br/><em>transforma</em> el campo</h2>
              <p className="section-body">
                Surgido de la Feria Ganadera de Puebla, el proyecto ofrece talleres introductorios digitales y acompañamiento técnico personalizado en rancho sobre pastoreo rotacional, manejo regenerativo del suelo y sistemas agrosilvopastoriles — mejorando la productividad sin comprometer los ecosistemas.
              </p>
              <p className="section-body" style={{ marginTop:"1rem" }}>
                La ganadería representa el <strong>39.7% del PIB agropecuario</strong> (SADER, 2025), pero opera bajo modelos intensivos que degradan el suelo. La ganadería regenerativa activa los ecosistemas mientras genera rentabilidad sostenible (FAO, 2017).
              </p>
              <div className="ods-chips">
                {["ODS 2 · Hambre Cero","ODS 12 · Consumo Responsable","ODS 13 · Acción Climática","ODS 15 · Ecosistemas Terrestres"].map(o => (
                  <span key={o} className="ods-chip">{o}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MISIÓN / VISIÓN ───────────────────────────────────────────── */}
        <section style={{ padding:"0 5% 5rem", background:"var(--warm-white)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            {[
              { label:"Misión", icon:Target, text:"Desarrollar e implementar soluciones que promuevan la sostenibilidad ambiental y social, fomentando la sustitución de prácticas insostenibles de ganadería hacia sistemas agrosilvopastoriles y de regeneración del suelo." },
              { label:"Visión", icon:Globe, text:"Ser agentes de cambio para que el campo y la producción primaria mexicana se valoren mediante prácticas sustentables, preservando la calidad de vida de los productores, la biodiversidad y mitigando el cambio climático." },
            ].map(({ label, icon: Icon, text }, i) => (
              <Reveal key={label} delay={i * 0.15}>
                <div style={{ background:"var(--cream)", borderRadius:"20px", padding:"2.5rem", border:"1px solid rgba(92,122,90,0.1)", transition:"all 0.3s", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(44,36,22,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"var(--sage-pale)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.2rem" }}>
                    <Icon size={18} color="var(--sage)" />
                  </div>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--earth-light)", marginBottom:"0.6rem" }}>{label}</p>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:"0.95rem", fontWeight:400, lineHeight:1.75, color:"var(--earth-mid)" }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CURSOS ────────────────────────────────────────────────────── */}
        <section id="cursos" className="section" style={{ background:"var(--cream)" }}>
          <Reveal>
            <div className="section-tag">Formación Profesional</div>
            <h2 className="section-title">Catálogo de<br/><em>Cursos</em></h2>
            <p className="section-body">Desde sensibilización digital hasta certificación profesional. Cada nivel acompaña al productor en su transición con rigor técnico y cercanía al territorio.</p>
          </Reveal>
          <div className="courses-grid">
            {cursos.map((c, i) => {
              const esCertificacion = c.precio !== "Gratis";
              return (
              <Reveal key={c.nivel} delay={i * 0.15}>
                <div className="course-card" style={{ display:"flex", flexDirection:"column", height:"100%" }}>
                  <div className="course-icon" style={{ background: c.color + "18", color: c.color }}>
                    <c.icon size={22} />
                  </div>
                  <div className="course-level">{c.nivel}</div>
                  <div className="course-name">{c.name}</div>
                  <div className="course-desc">{c.desc}</div>
                  <div style={{ marginBottom:"1rem" }}>
                    {c.temas.map(t => (
                      <div key={t} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"0.78rem", color:"var(--earth-mid)", marginBottom:"0.3rem" }}>
                        <CheckCircle size={12} color="var(--sage)" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="course-meta" style={{ marginBottom:"1rem" }}>
                    <span>⏱ {c.horas}</span>
                    <span>📚 {c.modulos}</span>
                  </div>
                  <div className="course-price" style={{ marginTop:"auto", color: c.color }}>{c.precio}</div>
                  {esCertificacion && (
                    <div className="course-clabe">
                      <div className="course-clabe-label">CLABE para pago</div>
                      <div className="course-clabe-value">000 000 000000000000</div>
                      <p className="course-clabe-note">Concepto: GRPRO-CERT + nombre del participante.</p>
                    </div>
                  )}
                </div>
              </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── IMPACTO BENTO ─────────────────────────────────────────────── */}
        <section id="usuarios" className="section" style={{ background:"var(--warm-white)" }}>
          <Reveal>
            <div className="section-tag">Usuarios del Programa</div>
            <h2 className="section-title">Seguimiento de<br/><em>participantes</em></h2>
            <p className="section-body">Resumen de los perfiles entrevistados para validar el modelo. Cada productor aparece con certificacion cumplida y acceso rapido a su ficha de detalles.</p>
          </Reveal>

          <div className="users-summary">
            {[
              { value: usuarios.length, label: "perfiles entrevistados" },
              { value: usuariosCompletos, label: "certificaciones cumplidas" },
              { value: usuariosPendientes, label: "pendientes" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="users-stat">
                  <div className="users-stat-value">{item.value}</div>
                  <div className="users-stat-label">{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="users-grid">
              {usuarios.map((usuario) => (
                <a className="user-card" key={usuario.nombre} href={`#${usuario.id}`}>
                  <div className="user-card-top">
                    <div className="user-avatar">{usuario.iniciales}</div>
                    <span className="status-pill done">Certificado</span>
                  </div>
                  <div className="user-profile">{usuario.perfil}</div>
                  <span className="user-name">
                    {usuario.nombre}
                    <ArrowRight size={14} />
                  </span>
                  <span className="user-location">{usuario.ubicacion}</span>
                  <p className="user-summary">{usuario.resumen}</p>
                  <div>
                    <span style={{ fontSize:"0.74rem", color:"var(--earth-light)" }}>{usuario.avance}% completado</span>
                    <div className="progress-track" aria-hidden="true">
                      <div className="progress-fill" style={{ width: `${usuario.avance}%` }} />
                    </div>
                  </div>
                  <div className="user-meta">
                    <span className="user-chip"><CheckCircle size={12} /> {usuario.fecha}</span>
                    <span className="user-chip">{usuario.curso}</span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="user-details-grid">
              {usuarios.map((usuario) => (
                <article className="user-detail-card" id={usuario.id} key={`${usuario.id}-detail`}>
                  <div className="user-detail-head">
                    <div>
                      <div className="user-detail-title">{usuario.nombre}</div>
                      <div className="user-detail-subtitle">{usuario.perfil} · {usuario.ubicacion}</div>
                    </div>
                    <span className="status-pill done">Cumplida</span>
                  </div>
                  <p className="user-detail-body">{usuario.detalle}</p>
                  <div className="user-detail-list">
                    {usuario.puntos.map((punto) => (
                      <div className="user-detail-item" key={punto}>
                        <CheckCircle size={13} color="var(--sage)" />
                        {punto}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="impacto" className="section" style={{ background:"var(--warm-white)" }}>
          <Reveal>
            <div className="section-tag">Impacto del Proyecto</div>
            <h2 className="section-title">Transformación<br/><em>real</em> en el territorio</h2>
          </Reveal>
          <div className="bento">
            <Reveal delay={0.0}>
              <div className="bento-card dark wide">
                <img className="bento-img" src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=70" alt="" />
                <div className="bento-icon"><Globe size={24} color="rgba(245,240,232,0.6)" /></div>
                <div className="bento-title" style={{ color:"var(--cream)" }}>San Andrés Cholula<br/>& Santa Isabel Cholula</div>
                <div className="bento-body" style={{ color:"rgba(245,240,232,0.65)" }}>Municipios piloto del proyecto. Pequeños y medianos ganaderos en zonas rurales y periurbanas con alta potencial de transición regenerativa.</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bento-card green">
                <div className="bento-num" style={{ color:"rgba(255,255,255,0.9)" }}>3</div>
                <div className="bento-label" style={{ color:"rgba(255,255,255,0.6)" }}>niveles de impacto</div>
                <div style={{ marginTop:"1rem", fontSize:"0.8rem", color:"rgba(255,255,255,0.75)", lineHeight:1.7 }}>
                  Ambiental · Social · Económico. El modelo combina restauración del suelo con viabilidad productiva y fortalecimiento comunitario.
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="bento-card" style={{ background:"var(--cream)" }}>
                <div className="bento-icon"><Leaf size={24} color="var(--sage)" /></div>
                <div className="bento-title" style={{ color:"var(--earth)" }}>Conservación del Suelo</div>
                <div className="bento-body">Recuperación de pastizales degradados mediante pastoreo rotacional. Reducción del sobrepastoreo y aumento de biodiversidad.</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bento-card gold">
                <div className="bento-num">7</div>
                <div className="bento-label">indicadores de beneficio</div>
                <div style={{ marginTop:"1rem", fontSize:"0.78rem", lineHeight:1.7, opacity:0.8 }}>Productores capacitados · Ranchos con prácticas regenerativas · Reducción de sobrepastoreo · Integración a cooperativa · Alcance digital</div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bento-card wide">
                <div className="bento-icon"><Users size={24} color="var(--sage)" /></div>
                <div className="bento-title" style={{ color:"var(--earth)" }}>Red Cooperativa</div>
                <div className="bento-body">A largo plazo, productores certificados se integran a una cooperativa para fortalecer colaboración, acceso a mercados sostenibles y escalar el impacto a otras regiones del país.</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── EQUIPO ────────────────────────────────────────────────────── */}
        <section id="equipo" className="section" style={{ background:"var(--cream)" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"0.5rem" }}>
              <div className="section-tag" style={{ justifyContent:"center" }}>El Equipo</div>
              <h2 className="section-title" style={{ textAlign:"center" }}>Las personas detrás<br/>del <em>cambio</em></h2>
              <p className="section-body" style={{ textAlign:"center", margin:"0 auto" }}>Ingenieros, agrónomos y emprendedores unidos por la convicción de que el campo mexicano puede regenerarse. Primavera 2026 — BUAP.</p>
            </div>
          </Reveal>
          <div className="team-grid">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="team-card">
                  <div className="team-avatar">{m.init}</div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="cta-section">
          <Reveal>
            <h2 className="cta-title">¿Listo para transformar<br/>tu <em>rancho</em>?</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="cta-right">
              <p className="cta-body">Únete a la red de productores que ya está cambiando el campo mexicano. Desde un taller introductorio gratuito en YouTube hasta la certificación profesional con integración cooperativa.</p>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("cursos")}>
                  Ver Cursos <ArrowRight size={16} />
                </button>
                <button className="btn-outline" style={{ color:"var(--cream)", borderColor:"rgba(245,240,232,0.25)" }}>
                  <MapPin size={14} /> Ver Puntos de Venta
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer>
          <div className="footer-top">
            <div>
              <div className="footer-brand">GR<span>Pro</span></div>
              <p className="footer-desc">Cooperativa de capacitación y acompañamiento técnico para la transición hacia la ganadería regenerativa en México. Primavera 2026.</p>
            </div>
            <div>
              <div className="footer-heading">Plataforma</div>
              <ul className="footer-links">
                {["Dashboard","Calculadora","Potreros","Lotes"].map(l => <li key={l}><a>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Cursos</div>
              <ul className="footer-links">
                {["Introducción","Avanzado","Certificación","Cooperativa"].map(l => <li key={l}><a>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Equipo</div>
              <ul className="footer-links">
                {team.slice(0,4).map(m => <li key={m.name}><a>{m.name.split(" ").slice(0,2).join(" ")}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 GRPro · Ingeniería y Gestión de Proyectos · BUAP</span>
            <div className="footer-ods">
              {[{n:"2",c:"#DDA63A"},{n:"12",c:"#BF8B2E"},{n:"13",c:"#3F7E44"},{n:"15",c:"#56C02B"}].map(o => (
                <div key={o.n} className="ods-dot" style={{ background: o.c }}>{o.n}</div>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

function Target(props) { return <TrendingUp {...props} />; }
