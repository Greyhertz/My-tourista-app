// import { Button } from '@/components/ui/button';

// export default function Test() {
//   return (
//     <div className="bg-background text-foreground">
//       <p className="text-med">Test</p>
//       <Button variant="secondary" className='bg-green-500'>Action</Button>
//     </div>
//   );
// }

// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
// import { AppSidebar } from '@/components/core/AppSidebar';


// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider
//       style={{
//         ['--sidebar-width' as any]: '15rem',
//         ['--sidebar-width-mobile' as any]: '20rem',
//       }}
//       defaultOpen={false}
//     >
//       <AppSidebar />
//       <main>
//         {/* <SheetTrigger asChild>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               variant="outline"
//               size="icon"
//               className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <motion.div
//                 animate={{ rotate: open() ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {open() ? (
//                   <X className="h-4 w-4" />
//                 ) : (
//                   <Menu className="h-4 w-4" />
//                 )}
//               </motion.div>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
//             </Button>
//           </motion.div>
//         </SheetTrigger> */}
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }

// import Navbar from "@/components/core/Navbar";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to TravelMate</h1>
      {/* <Navbar /> */}
    </div>
  );
}

 