import { create } from "zustand";
// import { Records } from "../lib/interfaces/Records";

interface RecordsState {
  records: [];
  setRecords: (records: array) => void;
}

const useRecordsStore = create<RecordsState>((set) => ({
  records: null,
  setRecords: (records) => set({ records }),
}));

export default useRecordsStore;
