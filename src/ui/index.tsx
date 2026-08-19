import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Building2, Check, ClipboardCheck, Filter, Home, Map, Menu, Settings, UserRound } from 'lucide-react';

type Children = { children?: ReactNode };

export function AppShell({ children }: Children) {
  return <div className="aiguillon-shell"><Sidebar/><Topbar/><main className="aiguillon-main"><div className="aiguillon-content">{children}</div></main></div>;
}

const navItems = [[Home, 'Vue d’ensemble'], [ClipboardCheck, 'Vérifications'], [Building2, 'Résidences'], [Map, 'Carte'], [Settings, 'Paramètres']] as const;

export function Sidebar() {
  return <aside className="aiguillon-sidebar" aria-label="Navigation principale"><Brand/><nav className="aiguillon-nav">{navItems.map(([Icon,label], index)=><button key={label} className="aiguillon-nav__item" aria-current={index===1?'page':undefined}><Icon/>{label}</button>)}</nav><div className="aiguillon-user"><span>CM</span><div><b>Camille Martin</b><small>Agent de terrain</small></div></div></aside>;
}

export function Topbar() {
  return <header className="aiguillon-topbar"><IconButton aria-label="Ouvrir le menu"><Menu/></IconButton><Brand/><div className="aiguillon-topbar__spacer"/><IconButton aria-label="Compte utilisateur"><UserRound/></IconButton><IconButton aria-label="Afficher les filtres"><Filter/></IconButton></header>;
}

function Brand(){return <div className="aiguillon-brand"><span className="aiguillon-brand__mark"><Check/></span><span>BUCKET<small>CONTRÔLES TERRAIN</small></span></div>}
export function KpiCard({value,label}: {value: ReactNode; label: ReactNode}) { return <div className="kpi-card"><b>{value}</b><span>{label}</span></div>; }
export function Panel({children,className='',...props}: Children & HTMLAttributes<HTMLElement>) { return <section className={`panel ${className}`} {...props}>{children}</section>; }
export function DataTable(props: HTMLAttributes<HTMLDivElement>) { return <div className="data-table" {...props}/>; }
export function SegmentedControl(props: HTMLAttributes<HTMLDivElement>) { return <div className="segmented" {...props}/>; }
export function ModulePill(props: HTMLAttributes<HTMLSpanElement>) { return <span className="module-pill" {...props}/>; }
export function IconButton({className='',...props}: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`icon-button ${className}`} {...props}/>; }
export function Button({className='',...props}: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`button ${className}`} {...props}/>; }
export function Badge(props: HTMLAttributes<HTMLSpanElement>) { return <span className="badge" {...props}/>; }
