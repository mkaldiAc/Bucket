import { useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { BarChart3, Check, Filter, Home, Menu, Settings, UserRound } from 'lucide-react';

type Children = { children?: ReactNode };

export function AppShell({ children, activeView='overview', onNavigate }: Children & {activeView?:'overview'|'metrics';onNavigate?:(view:'overview'|'metrics')=>void}) {
  return <div className="aiguillon-shell"><Sidebar activeView={activeView} onNavigate={onNavigate}/><Topbar activeView={activeView} onNavigate={onNavigate}/><main className="aiguillon-main"><div className="aiguillon-content">{children}</div></main></div>;
}

const navItems = [[Home, 'Vue d’ensemble', 'overview'], [BarChart3, 'Métriques', 'metrics'], [Settings, 'Paramètres', 'settings']] as const;

export function Sidebar({activeView='overview',onNavigate}:{activeView?:string;onNavigate?:(view:'overview'|'metrics')=>void}) {
  return <aside className="aiguillon-sidebar" aria-label="Navigation principale"><Brand/><nav className="aiguillon-nav">{navItems.map(([Icon,label,view])=><button key={label} className="aiguillon-nav__item" aria-current={activeView===view?'page':undefined} onClick={()=>view!=='settings'&&onNavigate?.(view)}><Icon/>{label}</button>)}</nav><div className="aiguillon-user"><span>CM</span><div><b>Camille Martin</b><small>Agent de terrain</small></div></div></aside>;
}

export function Topbar({activeView='overview',onNavigate}:{activeView?:string;onNavigate?:(view:'overview'|'metrics')=>void}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const navigate=(view:'overview'|'metrics')=>{onNavigate?.(view);setMenuOpen(false)};
  return <header className="aiguillon-topbar"><IconButton aria-label={menuOpen?'Fermer le menu':'Ouvrir le menu'} aria-expanded={menuOpen} aria-controls="responsive-navigation" onClick={()=>setMenuOpen(open=>!open)}><Menu/></IconButton><Brand/><div className="aiguillon-topbar__spacer"/><IconButton aria-label="Compte utilisateur"><UserRound/></IconButton><IconButton aria-label="Afficher les filtres"><Filter/></IconButton>{menuOpen&&<nav id="responsive-navigation" className="aiguillon-mobile-nav" aria-label="Navigation principale">{navItems.map(([Icon,label,view])=><button key={label} className="aiguillon-nav__item" aria-current={activeView===view?'page':undefined} onClick={()=>view!=='settings'&&navigate(view)}><Icon/>{label}</button>)}</nav>}</header>;
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
