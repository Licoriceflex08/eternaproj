// app/page.tsx - The minimal, clean App Router root file.
'use client'; 
// Keeps 'use client' since it renders client components immediately below

// Import the AppProvider (contains useReducer/Context) and the DashboardLayout (contains all UI)
import { AppProvider } from '@/hooks/usetokendata';
import { DashboardContent } from '@/components/Layout/Dashboard'; 

// The final default export component is minimal and focused on structure.
export default function AxiomReplicaApp() {
  return (
    <AppProvider> 
      <DashboardContent />
    </AppProvider>
  );
}
// You can now safely delete ALL other code (imports, types, mocks, utility components, etc.) 
// from your original page.tsx.