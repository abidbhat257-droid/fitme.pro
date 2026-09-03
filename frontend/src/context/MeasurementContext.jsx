import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cmToIn, inToCm, kgToLb, lbToKg } from "@/lib/units";
import { getStorage } from "@/lib/storage";

const DEFAULTS = { unit:"metric", age:"", sex:"male", height:"", weight:"", waist:"", hip:"", neck:"", wrist:"", goalWeight:"", activity:"moderate" };
const LENGTH_FIELDS=["height","waist","hip","neck","wrist"], WEIGHT_FIELDS=["weight","goalWeight"];
const MeasurementContext=createContext(null);
const round2=v=>Math.round(v*100)/100;
function hydrateMeasurements(){if(typeof window==="undefined")return DEFAULTS;try{const raw=window.localStorage.getItem("fitmepro:measurements:v1");return raw?{...DEFAULTS,...JSON.parse(raw)}:DEFAULTS}catch{return DEFAULTS}}
function hydrateCalculatorInputs(){if(typeof window==="undefined")return {};try{const raw=window.localStorage.getItem("fitmepro:calculator-inputs:v1");return raw?JSON.parse(raw):{}}catch{return {}}}
function hydrateSnapshots(){if(typeof window==="undefined")return [];try{const raw=window.localStorage.getItem("fitmepro:snapshots:v1");return raw?JSON.parse(raw):[]}catch{return []}}
function hydrateGoals(){if(typeof window==="undefined")return [];try{const raw=window.localStorage.getItem("fitmepro:goals:v1");return raw?JSON.parse(raw):[]}catch{return []}}
export function MeasurementProvider({children}){
 const storage=getStorage();
 const [state,setState]=useState(hydrateMeasurements);
 const [calculatorInputs,setCalculatorInputs]=useState(hydrateCalculatorInputs);
 const [snapshots,setSnapshots]=useState(hydrateSnapshots);
 const [goals,setGoals]=useState(hydrateGoals);
 useEffect(()=>{storage.setMeasurements(state)},[state,storage]);
 useEffect(()=>{try{window.localStorage.setItem("fitmepro:calculator-inputs:v1",JSON.stringify(calculatorInputs))}catch{}},[calculatorInputs]);
 useEffect(()=>{storage.saveSnapshots(snapshots)},[snapshots,storage]);
 useEffect(()=>{storage.saveGoals(goals)},[goals,storage]);
 const update=useCallback(patch=>setState(prev=>({...prev,...patch})),[]);
 const updateCalculatorInputs=useCallback((calculatorId,patch)=>setCalculatorInputs(prev=>({...prev,[calculatorId]:{...(prev[calculatorId]||{}),...patch}})),[]);
 const reset=useCallback(()=>{setState(DEFAULTS);setCalculatorInputs({})},[]);
 const setUnit=useCallback(unit=>setState(prev=>{if(prev.unit===unit)return prev;const next={...prev,unit};const cvtLen=unit==="imperial"?cmToIn:inToCm, cvtWt=unit==="imperial"?kgToLb:lbToKg;for(const f of LENGTH_FIELDS){const n=parseFloat(prev[f]);if(Number.isFinite(n)&&n>0)next[f]=String(round2(cvtLen(n)))}for(const f of WEIGHT_FIELDS){const n=parseFloat(prev[f]);if(Number.isFinite(n)&&n>0)next[f]=String(round2(cvtWt(n)))}return next}),[]);
 const saveSnapshot=useCallback(name=>{const snap={id:typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:name?.trim()||`Snapshot ${new Date().toLocaleDateString()}`,createdAt:new Date().toISOString(),state:{...state},calculatorInputs:{...calculatorInputs}};setSnapshots(prev=>[snap,...prev].slice(0,100));return snap},[state,calculatorInputs]);
 const deleteSnapshot=useCallback(id=>setSnapshots(prev=>prev.filter(s=>s.id!==id)),[]);
 const loadSnapshot=useCallback(id=>{const snap=snapshots.find(s=>s.id===id);if(snap){setState({...DEFAULTS,...snap.state});setCalculatorInputs(snap.calculatorInputs||snap.state?.calculatorInputs||{})}},[snapshots]);
 const genId=()=>typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random());
 const saveGoal=useCallback(data=>{const goal={id:genId(),createdAt:new Date().toISOString(),startDate:data.startDate||new Date().toISOString(),...data};setGoals(prev=>[goal,...prev].slice(0,20));return goal},[]);
 const updateGoal=useCallback((id,patch)=>setGoals(prev=>prev.map(g=>g.id===id?{...g,...patch}:g)),[]);
 const deleteGoal=useCallback(id=>setGoals(prev=>prev.filter(g=>g.id!==id)),[]);
 return <MeasurementContext.Provider value={{state,update,reset,setUnit,calculatorInputs,updateCalculatorInputs,snapshots,saveSnapshot,deleteSnapshot,loadSnapshot,goals,saveGoal,updateGoal,deleteGoal}}>{children}</MeasurementContext.Provider>;
}
export function useMeasurements(){const ctx=useContext(MeasurementContext);if(!ctx)throw new Error("useMeasurements outside provider");return ctx;}
