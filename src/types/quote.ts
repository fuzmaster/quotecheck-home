export type ScopeAnswer = "yes" | "no" | "not_sure";
export type Quote = { id:string; contractorName:string; totalPrice:number; depositAmount:number; timelineDays:number; laborIncluded:ScopeAnswer; materialsIncluded:ScopeAnswer; permitsIncluded:ScopeAnswer; cleanupIncluded:ScopeAnswer; warrantyIncluded:ScopeAnswer; materialQuality:"basic"|"standard"|"premium"|"not_sure"; notes:string; };
