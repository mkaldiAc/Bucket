import { config } from '../config'; import { initialChecks, residences } from '../data/mockData'; import type { Check, Residence } from '../types'; import { authService } from './authService';
const wait=()=>new Promise(r=>setTimeout(r,180)); const memory=[...initialChecks];
async function request<T>(path:string, options?:RequestInit):Promise<T>{const token=await authService.getAccessToken();const response=await fetch(`${config.apiBaseUrl}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}) ,...options?.headers}});if(!response.ok)throw new Error(`API ${response.status}`);return response.json();}
type CollectionResponse<T>={value:T[]};
async function collection<T>(path:string):Promise<T[]>{return (await request<CollectionResponse<T>>(path)).value;}
export const checkRepository={
  async list():Promise<Check[]>{if(config.useMockData){await wait();return [...memory];}return collection('/checks');},
  async residences():Promise<Residence[]>{if(config.useMockData)return residences;return collection('/residences');},
  async update(id:string, patch:Partial<Check>):Promise<Check>{if(config.useMockData){await wait();const index=memory.findIndex(x=>x.id===id);memory[index]={...memory[index],...patch};return memory[index];}return request(`/checks/${id}`,{method:'PATCH',body:JSON.stringify(patch)});}
};
