export type Urgency = 'Critique' | 'Haute' | 'Normale' | 'Faible';
export type Status = 'À faire' | 'En cours' | 'Terminée';
export interface Residence { id:string; name:string; address:string; city:string; latitude:number; longitude:number; }
export interface Check { id:string; title:string; description:string; residenceId:string; urgency:Urgency; status:Status; dueDate:string; category:string; comment?:string; result?:'ok'|'not-ok'; photoName?:string; }
export interface Filters { residenceId:string; maxDistance:string; urgency:string; status:string; }
