import {useEffect,useRef,useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {LocateFixed,X} from 'lucide-react';
import type {Finding,FindingRequirement,Residence} from '../../types';

type MapItem={id:string;label:string;residenceId:string;kind:'requirement'|'finding'};

export function OperationalMap({requirements,findings,residences,onRequirement,onFinding}:{requirements:FindingRequirement[];findings:Finding[];residences:Residence[];onRequirement:(id:string)=>void;onFinding:(id:string)=>void}){
 const node=useRef<HTMLDivElement>(null),map=useRef<L.Map|null>(null),overlays=useRef<L.LayerGroup|null>(null);
 const [mode,setMode]=useState<'requirements'|'findings'>('requirements'),[group,setGroup]=useState<MapItem[]>([]),[position,setPosition]=useState<L.LatLng|null>(null),[radius,setRadius]=useState(2000),[error,setError]=useState('');
 useEffect(()=>{
  if(!node.current||map.current)return;
  const instance=L.map(node.current,{zoomControl:true}).setView([48.11,-1.68],7);
  map.current=instance;
  overlays.current=L.layerGroup().addTo(instance);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:19,crossOrigin:true}).on('tileerror',()=>setError('Le fond de carte est temporairement indisponible.')).addTo(instance);
  const resizeObserver=new ResizeObserver(()=>instance.invalidateSize());
  resizeObserver.observe(node.current);
  requestAnimationFrame(()=>instance.invalidateSize());
  return()=>{resizeObserver.disconnect();instance.remove();map.current=null;overlays.current=null};
 },[]);
 useEffect(()=>{
  const instance=map.current,layer=overlays.current;
  if(!instance||!layer)return;
  layer.clearLayers();
  const items:MapItem[]=mode==='requirements'?requirements.map(r=>({id:r.id,label:r.title,residenceId:r.assetRef.residenceId,kind:'requirement'})):findings.map(f=>({id:f.id,label:f.title,residenceId:f.residenceId,kind:'finding'}));
  const points:L.LatLngExpression[]=[];
  residences.forEach(r=>{
   const related=items.filter(i=>i.residenceId===r.id);
   if(!related.length)return;
   points.push([r.latitude,r.longitude]);
   const icon=L.divIcon({className:'map-pin',html:`<span><b>${related.length}</b></span>`,iconSize:[34,42],iconAnchor:[17,42]});
   L.marker([r.latitude,r.longitude],{icon}).addTo(layer).bindTooltip(`${r.name} · ${related.length}`).on('click',()=>setGroup(related));
  });
  if(position){L.circleMarker(position,{radius:8,fillOpacity:1}).addTo(layer);L.circle(position,{radius,color:'#315a9b'}).addTo(layer)}
  else if(points.length)instance.fitBounds(L.latLngBounds(points),{padding:[30,30],maxZoom:11});
  requestAnimationFrame(()=>instance.invalidateSize());
 },[mode,requirements,findings,residences,position,radius]);
 const locate=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>{const here=L.latLng(p.coords.latitude,p.coords.longitude);setError('');setPosition(here);map.current?.setView(here,13)},()=>setError('Localisation refusée ou indisponible.')):setError('Géolocalisation indisponible.');
 return <section className="map-view panel"><header className="view-header"><div><h1>Carte opérationnelle</h1><p>{mode==='requirements'?'Obligations visibles':'Observations réalisées'}</p></div><div className="segmented"><button aria-pressed={mode==='requirements'} onClick={()=>setMode('requirements')}>À faire</button><button aria-pressed={mode==='findings'} onClick={()=>setMode('findings')}>Réalisées</button></div></header><div className="map-tools"><button onClick={locate}><LocateFixed/> Me localiser</button>{[500,1000,2000,5000,10000,20000].map(v=><button aria-pressed={radius===v} onClick={()=>setRadius(v)} key={v}>{v<1000?`${v} m`:`${v/1000} km`}</button>)}{error&&<span role="alert">{error}</span>}</div><div ref={node} className="map-canvas"/>{group.length>0&&<div className="map-picker" role="dialog" aria-label="Choisir un élément"><button className="picker-close" onClick={()=>setGroup([])} aria-label="Fermer"><X/></button><h2>Choisir explicitement</h2>{group.map(i=><button key={i.id} onClick={()=>{if(i.kind==='requirement')onRequirement(i.id);else onFinding(i.id);setGroup([])}}>{i.label}<small>{i.id}</small></button>)}</div>}</section>
}
