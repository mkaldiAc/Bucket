import { config } from '../config'; import { initialChecks, residences } from '../data/mockData'; import type { Check, Residence } from '../types'; import { authService } from './authService';
const wait=()=>new Promise(r=>setTimeout(r,180)); let memory=[...initialChecks];
async function request<T>(path:string, options?:RequestInit):Promise<T>{const token=await authService.getAccessToken();const response=await fetch(`${config.apiBaseUrl}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}) ,...options?.headers}});if(!response.ok)throw new Error(`API ${response.status}`);return response.json();}
export const checkRepository={
  async list():Promise<Check[]>{if(config.useMockData){await wait();return [...memory];}return request('/checks');},
  async residences():Promise<Residence[]>{if(config.useMockData)return residences;return request('/residences');},
  async update(id:string, patch:Partial<Check>):Promise<Check>{if(config.useMockData){await wait();const index=memory.findIndex(x=>x.id===id);memory[index]={...memory[index],...patch};return memory[index];}return request(`/checks/${id}`,{method:'PATCH',body:JSON.stringify(patch)});}
};
