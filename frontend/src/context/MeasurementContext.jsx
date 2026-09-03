import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cmToIn, inToCm, kgToLb, lbToKg } from "@/lib/units";
import { getStorage } from "@/lib/storage";

const DEFAULTS = { unit:"metric", age:"", sex:"male", height:"", weight:"", waist:"", hip:"", neck:"", wrist:"", goalWeight:"", activity:"moderate" };
const DEFAULT_ADVANCED = {
  distance:"", minutes:"", seconds:"", raceDistance:"", raceMinutes:"", raceSeconds:"", liftWeight:"", load:"", reps:"", sets:"", benchPress:"", squat:"", deadlift:"", totalVolume:"", bodyWeight:"",
  heartRate:"", restingHeartRate:"", recoveryHeartRate:"", maxHeartRate:"", systolicBP:"", diastolicBP:"", exerciseDuration:"", met:"",
  dailyCalories:"", targetCalories:"", currentCalories:"", protein:"", carbs:"", fat:"", fiber:"", sodium:"", caffeine:"", water:"", meals:"", targetWeight:"", startWeight:"", currentWeight:"", weightToLose:"", dailyDeficit:"", weeklyRate:"", targetBMI:""
};
const LENGTH_FIELDS=["height","waist","hip","neck","wrist"], WEIGHT_FIELDS=["weight","goalWeight"];
const MeasurementContext=createContext(null);
const round2=v=>Math.round(v*100)/100;
function hydrateMeasurements(){if(typeof window==="undefined")return DEFAULTS;try{const raw=window.localStorage.getItem("fitmepro:measurements:v1");return raw?{...DEFAULTS,...JSON.parse(raw)}:DEFAULTS}catch{return DEFAULTS}}
function hydrateAdvanced(){if(typeof window==="undefined")return DEFAULT_ADVANCED;try{const raw=window.localStorage.getItem("fitmepro:advanced-inputs:v1");return raw?{...DEFAULT_ADVANCED,...JSON.parse(raw)}:DEFAULT_ADVANCED}catch{return DEFAULT_ADVANCED}}
function hydrateSnapshots(){if(typeof window==="undefined")return [];try{const raw=window.localStorage.getItem("fitmepro:snapshots:v1");return raw?JSON.parse(raw):[]}catch{return []}}
function hydrateGoals(){if(typeof window==="undefined")return [];try{const raw=window.localStorage.getItem("fitmepro:goals:v1");return raw?JSON.parse(raw):[]}catch{return []}}
export function MeasurementProvider({children}){
 const storage=getStorage(); const [state,setState]=useState(hydrateMeasurements); const [advancedInputs,setAdvancedInputs]=useState(hydrateAdvanced); const [snapshots,setSnapshots]=useState(hydrateSnapshots); const [goals,setGoals]=useState(hydrateGoals);
 useEffect(()=>{storage.setMeasurements(state)},[state,storage]); useEffect(()=>{try{window.localStorage.setItem("fitmepro:advanced-inputs:v1",JSON.stringify(advancedInputs))}catch{}},[advancedInputs]); useEffect(()=>{storage.saveSnapshots(snapshots)},[snapshots,storage]); useEffect(()=>{storage.saveGoals(goals)},[goals,storage]);
 const update=useCallback(patch=>setState(prev=>({...prev,...patch})),[]); const updateAdvanced=useCallback(patch=>setAdvancedInputs(prev=>({...prev,...patch})),[]); const reset=useCallback(()=>{setState(DEFAULTS);setAdvancedInputs(DEFAULT_ADVANCED)},[]);
 const setUnit=useCallback(unit=>setState(prev=>{if(prev.unit===unit)return prev;const next={...prev,unit};const cvtLen=unit==="imperial"?cmToIn:inToCm, cvtWt=unit==="imperial"?kgToLb:lbToKg;for(const f of LENGTH_FIELDS){const n=parseFloat(prev[f]);if(Number.isFinite(n)&&n>0)next[f]=String(round2(cvtLen(n)))}for(const f of WEIGHT_FIELDS){const n=parseFloat(prev[f]);if(Number.isFinite(n)&&n>0)next[f]=String(round2(cvtWt(n)))}return next}),[]);
 const saveSnapshot=useCallback(name=>{const snap={id:typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:name?.trim()||`Snapshot ${new Date().toLocaleDateString()}`,createdAt:new Date().toISOString(),state:{...state,advancedInputs:{...advancedInputs}}};setSnapshots(prev=>[snap,...prev].slice(0,100));return snap},[state,advancedInputs]);
 const deleteSnapshot=useCallback(id=>setSnapshots(prev=>prev.filter(s=>s.id!==id)),[]); const loadSnapshot=useCallback(id=>{const snap=snapshots.find(s=>s.id===id);if(snap){setState({...DEFAULTS,...snap.state});setAdvancedInputs({...DEFAULT_ADVANCED,...(snap.state.advancedInputs||{})})}},[snapshots]);
 const genId=()=>typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random());
 const saveGoal=useCallback(data=>{const goal={id:genId(),createdAt:new Date().toISOString(),startDate:data.startDate||new Date().toISOString(),...data};setGoals(prev=>[goal,...prev].slice(0,20));return goal},[]); const updateGoal=useCallback((id,patch)=>setGoals(prev=>prev.map(g=>g.id===id?{...g,...patch}:g)),[]); const deleteGoal=useCallback(id=>setGoals(prev=>prev.filter(g=>g.id!==id)),[]);
 return <MeasurementContext.Provider value={{state,update,reset,setUnit,advancedInputs,updateAdvanced,snapshots,saveSnapshot,deleteSnapshot,loadSnapshot,goals,saveGoal,updateGoal,deleteGoal}}>{children}</MeasurementContext.Provider>;
}
export function useMeasurements(){const ctx=useContext(MeasurementContext);if(!ctx)throw new Error("useMeasurements outside provider");return ctx;}
