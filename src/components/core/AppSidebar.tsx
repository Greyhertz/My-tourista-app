// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Calendar,
//   ChevronDown,
//    ChevronRight,
//   ChevronUp,
//   Home,
//   Inbox,
//   Search,
//   Settings,
//   User2,
//   Users,
//   BarChart3,
//   FileText,
//   Heart,
//   Bell,
//   HelpCircle,
//   LogOut,
//   CreditCard,
//   Shield,
//   MapPin,
//   Camera,
//   Compass,
//   Star,
//   Navigation,
//   Icon,
//   User,
// } from 'lucide-react';

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '@/components/ui/collapsible';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarTrigger,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';

// // Navigation items
// const navigationItems = [
//   {
//     title: 'Dashboard',
//     url: '/dashboard',
//     icon: Home,
//     badge: null,
//   },
//   {
//     title: 'Explore Destinations',
//     url: '/explore',
//     icon: Compass,
//     badge: 'New',
//   },
//   {
//     title: 'My Trips',
//     url: '/trips',
//     icon: Navigation,
//     badge: '3',
//   },
//   {
//     title: 'Favorites',
//     url: '/favorites',
//     icon: Heart,
//     badge: null,
//   },
//   {
//     title: 'Photo Gallery',
//     url: '/gallery',
//     icon: Camera,
//     badge: null,
//   },
// ];

// // Tourist-specific features
// const touristFeatures = [
//   {
//     title: 'Trip Planning',
//     icon: Calendar,
//     children: [
//       { title: 'Create Trip', url: '/trips/create', icon: FileText },
//       { title: 'My Itineraries', url: '/itineraries', icon: FileText },
//       { title: 'Travel Calendar', url: '/calendar', icon: Calendar },
//     ],
//   },
//   {
//     title: 'Discoveries',
//     icon: MapPin,
//     children: [
//       { title: 'Local Attractions', url: '/attractions', icon: Star },
//       { title: 'Hidden Gems', url: '/gems', icon: Search },
//       { title: 'Reviews & Ratings', url: '/reviews', icon: BarChart3 },
//     ],
//   },
//   {
//     title: 'Community',
//     icon: Users,
//     children: [
//       { title: 'Travel Groups', url: '/groups', icon: Users },
//       { title: 'Messages', url: '/messages', icon: Inbox },
//       { title: 'Travel Feed', url: '/feed', icon: Bell },
//     ],
//   },
// ];

// // Settings sections
// const settingsItems = [
//   {
//     title: 'Account',
//     children: [
//       { title: 'Profile Settings', url: '/settings/profile', icon: User2 },
//       { title: 'Privacy & Security', url: '/settings/privacy', icon: Shield },
//       { title: 'Notifications', url: '/settings/notifications', icon: Bell },
//     ],
//   },
//   {
//     title: 'Preferences',
//     children: [
//       { title: 'Travel Preferences', url: '/settings/travel', icon: MapPin },
//       { title: 'Language & Region', url: '/settings/language', icon: Settings },
//     ],
//   },
// ];

// // Animation variants
// // const fadeInVariants = {
// //   hidden: { opacity: 0, x: -20 },
// //   visible: { opacity: 1, x: 0 },
// // };

// // const slideDownVariants = {
// //   hidden: { opacity: 0, height: 0 },
// //   visible: { opacity: 1, height: 'auto' },
// // };

// const iconVariants = {
//   hover: { scale: 1.1, rotate: 80 },
//   tap: { scale: 0.95,  },
// };

// const logoVariants = {
//   hover: {
//     scale: 1.05,
//     rotate: [0, -5, 5, 0],
//     transition: { duration: 0.5 },
//   },
// };


// interface AppSidebarProps {
//   userName?: string;
//   userEmail?: string;
//   userAvatar?: string;
// }

// export default function AppSidebar({
//   userName = 'John Traveler',
//   userEmail = 'john.traveler@email.com',
//   userAvatar = '',
// }: AppSidebarProps) {
//   const [openSections, setOpenSections] = useState<string[]>(['trip-planning']);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const { state, setOpen } = useSidebar();
//   const isCollapsed = state === 'collapsed';

//   const toggleSection = (sectionId: string) => {
//     setOpenSections(prev =>
//       prev.includes(sectionId)
//         ? prev.filter(id => id !== sectionId)
//         : [...prev, sectionId]
//     );
//   };

//   const handleCollapsedClick = (e: React.MouseEvent) => {
//     if (isCollapsed) {
//       e.preventDefault();
//       setOpen(true);
//     }
//   };

//   return (
//     <motion.div
//       className="h-screen"
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//     >
//       <Sidebar
//         side="left"
//         variant="sidebar"
//         collapsible="icon"
//         className=""
//         style={
//           {
//             '--sidebar-width': '--sidebar-background',
//             '--sidebar-width-icon': '5rem',
//             '--sidebar-background': 'white',
//           } as React.CSSProperties
//         }
//       >
//         {/* Header */}
//         <SidebarHeader className="border-b border-slate-200  backdrop-blur-sm">
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <motion.div layout transition={{ duration: 0.3 }}>
//                 {isCollapsed && (
//                   <motion.div
//                     // className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-lg shrink-0 shadow-lg shadow-blue-500/25 cursor-pointer"
//                     variants={logoVariants}
//                     whileHover="hover"
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <SidebarTrigger />
//                   </motion.div>
//                 )}

//                 <AnimatePresence>
//                   {!isCollapsed && (
//                     <motion.div
//                       className="flex-1 min-w-0 overflow-hidden flex gap-4 justify-between"
//                       initial={{ opacity: 0, width: 0 }}
//                       animate={{ opacity: 1, width: 'auto' }}
//                       exit={{ opacity: 0, width: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.h1
//                         className="flex h-10 w-10 items-center justify-center   font-bold text-lg shrink-0  shadow-blue-500/25 cursor-pointer text-center align-middle "
//                         variants={logoVariants}
//                         whileHover="hover"
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <User />
//                       </motion.h1>
//                       {/* <motion.div>
//                         <motion.h2
//                           className="font-semibold text-lg text-slate-800 dark:text-slate-100 truncate"
//                           initial={{ y: -10 }}
//                           animate={{ y: 0 }}
//                           transition={{ delay: 0.1 }}
//                         >
//                           Tourist App
//                         </motion.h2>
//                         <motion.p
//                           className="text-sm text-slate-600 dark:text-slate-400 truncate"
//                           initial={{ y: 10 }}
//                           animate={{ y: 0 }}
//                           transition={{ delay: 0.15 }}
//                         >
//                           Explore the world
//                         </motion.p>
//                       </motion.div> */}
//                       <SidebarTrigger className=''/>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarHeader>

//         {/* Content */}
//         <SidebarContent className="bg-transparent">
//           {/* Main Navigation */}
//           <SidebarGroup>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <SidebarGroupLabel className="text-slate-600 dark:text-slate-400 font-medium">
//                 Navigation
//               </SidebarGroupLabel>
//             </motion.div>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {navigationItems.map((item, index) => (
//                   <motion.div
//                     key={item.title}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.3 + index * 0.1 }}
//                   >
//                     <SidebarMenuItem>
//                       <SidebarMenuButton
//                         asChild
//                         onClick={handleCollapsedClick}
//                         className="hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors duration-200 group"
//                       >
//                         <motion.a
//                           href={item.url}
//                           className="flex items-center gap-3"
//                           whileHover={{ x: 4 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={handleCollapsedClick}
//                         >
//                           <motion.div
//                             variants={iconVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                           >
//                             <item.icon className="h-4 w-4" />
//                           </motion.div>
//                           <span className="flex-1 truncate">{item.title}</span>
//                           <AnimatePresence>
//                             {!isCollapsed && item.badge && (
//                               <motion.div
//                                 initial={{ scale: 0, opacity: 0 }}
//                                 animate={{ scale: 1, opacity: 1 }}
//                                 exit={{ scale: 0, opacity: 0 }}
//                                 transition={{
//                                   type: 'spring',
//                                   stiffness: 500,
//                                   damping: 30,
//                                 }}
//                               >
//                                 <Badge
//                                   variant={
//                                     item.badge === 'New'
//                                       ? 'default'
//                                       : 'secondary'
//                                   }
//                                   className={`text-xs shrink-0 ${
//                                     item.badge === 'New'
//                                       ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
//                                       : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300'
//                                   }`}
//                                 >
//                                   {item.badge}
//                                 </Badge>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.a>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   </motion.div>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {/* Tourist Features */}
//           <SidebarGroup>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//             >
//               <SidebarGroupLabel className="text-slate-600 dark:text-slate-400 font-medium">
//                 Features
//               </SidebarGroupLabel>
//             </motion.div>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {touristFeatures.map((feature, index) => {
//                   const sectionId = feature.title
//                     .toLowerCase()
//                     .replace(' ', '-');
//                   const isOpen = openSections.includes(sectionId);

//                   return (
//                     <motion.div
//                       key={feature.title}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.9 + index * 0.1 }}
//                     >
//                       <SidebarMenuItem>
//                         <Collapsible
//                           open={isOpen}
//                           onOpenChange={() => toggleSection(sectionId)}
//                         >
//                           <CollapsibleTrigger asChild>
//                             <SidebarMenuButton className="w-full hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300 transition-colors duration-200 group">
//                               <motion.div
//                                 variants={iconVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                               >
//                                 <feature.icon className="h-4 w-4" />
//                               </motion.div>
//                               <span className="flex-1 truncate">
//                                 {feature.title}
//                               </span>
//                               <AnimatePresence>
//                                 {!isCollapsed && (
//                                   <motion.div
//                                     initial={{ opacity: 0, scale: 0 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0 }}
//                                   >
//                                     <motion.div
//                                       animate={{ rotate: isOpen ? 180 : 0 }}
//                                       transition={{ duration: 0.3 }}
//                                     >
//                                       <ChevronDown className="h-4 w-4" />
//                                     </motion.div>
//                                   </motion.div>
//                                 )}
//                               </AnimatePresence>
//                             </SidebarMenuButton>
//                           </CollapsibleTrigger>
//                           <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
//                             <motion.div
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               exit={{ opacity: 0 }}
//                             >
//                               <SidebarMenuSub className="mt-1">
//                                 {feature.children.map((child, childIndex) => (
//                                   <motion.div
//                                     key={child.title}
//                                     initial={{ opacity: 0, x: -10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: childIndex * 0.05 }}
//                                   >
//                                     <SidebarMenuSubItem>
//                                       <SidebarMenuSubButton
//                                         asChild
//                                         className="hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors duration-200 ml-2"
//                                       >
//                                         <motion.a
//                                           href={child.url}
//                                           className="flex items-center gap-3"
//                                           whileHover={{ x: 2 }}
//                                         >
//                                           <child.icon className="h-3 w-3" />
//                                           <span className="truncate">
//                                             {child.title}
//                                           </span>
//                                         </motion.a>
//                                       </SidebarMenuSubButton>
//                                     </SidebarMenuSubItem>
//                                   </motion.div>
//                                 ))}
//                               </SidebarMenuSub>
//                             </motion.div>
//                           </CollapsibleContent>
//                         </Collapsible>
//                       </SidebarMenuItem>
//                     </motion.div>
//                   );
//                 })}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {/* Settings */}
//           <SidebarGroup>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.2 }}
//             >
//               <SidebarGroupLabel className="text-slate-600 dark:text-slate-400 font-medium">
//                 Settings
//               </SidebarGroupLabel>
//             </motion.div>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 1.3 }}
//                 >
//                   <SidebarMenuItem>
//                     <Collapsible
//                       open={openSections.includes('settings')}
//                       onOpenChange={() => toggleSection('settings')}
//                     >
//                       <CollapsibleTrigger asChild>
//                         <SidebarMenuButton
//                           className="w-full hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 transition-colors duration-200 group"
//                           onClick={handleCollapsedClick}
//                         >
//                           <motion.div
//                             variants={iconVariants}
//                             whileHover={{ ...iconVariants.hover, rotate: 90 }}
//                             whileTap="tap"
//                           >
//                             <Settings className="h-4 w-4" />
//                           </motion.div>
//                           <span className="flex-1 truncate">Settings</span>
//                           <AnimatePresence>
//                             {!isCollapsed && (
//                               <motion.div
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0 }}
//                               >
//                                 <motion.div
//                                   animate={{
//                                     rotate: openSections.includes('settings')
//                                       ? 180
//                                       : 0,
//                                   }}
//                                   transition={{ duration: 0.3 }}
//                                 >
//                                   <ChevronDown className="h-4 w-4" />
//                                 </motion.div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </SidebarMenuButton>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent className="transition-all duration-300">
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                         >
//                           <SidebarMenuSub className="mt-1">
//                             {settingsItems.map(section => (
//                               <div key={section.title}>
//                                 <AnimatePresence>
//                                   {!isCollapsed && (
//                                     <motion.div
//                                       className="px-4 py-1 text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider"
//                                       initial={{ opacity: 0, height: 0 }}
//                                       animate={{ opacity: 1, height: 'auto' }}
//                                       exit={{ opacity: 0, height: 0 }}
//                                     >
//                                       {section.title}
//                                     </motion.div>
//                                   )}
//                                 </AnimatePresence>
//                                 {section.children.map((child, childIndex) => (
//                                   <motion.div
//                                     key={child.title}
//                                     initial={{ opacity: 0, x: -10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: childIndex * 0.05 }}
//                                   >
//                                     <SidebarMenuSubItem>
//                                       <SidebarMenuSubButton
//                                         asChild
//                                         className="hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors duration-200 ml-2"
//                                       >
//                                         <motion.a
//                                           href={child.url}
//                                           className="flex items-center gap-3"
//                                           whileHover={{ x: 2 }}
//                                         >
//                                           <child.icon className="h-3 w-3" />
//                                           <span className="truncate">
//                                             {child.title}
//                                           </span>
//                                         </motion.a>
//                                       </SidebarMenuSubButton>
//                                     </SidebarMenuSubItem>
//                                   </motion.div>
//                                 ))}
//                               </div>
//                             ))}
//                           </SidebarMenuSub>
//                         </motion.div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </SidebarMenuItem>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 1.4 }}
//                 >
//                   <SidebarMenuItem>
//                     <SidebarMenuButton
//                       asChild
//                       className="hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-300 transition-colors duration-200 group"
//                     >
//                       <motion.a
//                         href="/help"
//                         className="flex items-center gap-3"
//                         whileHover={{ x: 4 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={handleCollapsedClick}
//                       >
//                         <motion.div
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                         >
//                           <HelpCircle className="h-4 w-4" />
//                         </motion.div>
//                         <span className="truncate">Help & Support</span>
//                       </motion.a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 </motion.div>
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>

//         {/* Footer */}
//         <SidebarFooter className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.5 }}
//           >
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <DropdownMenu
//                   open={userDropdownOpen}
//                   onOpenChange={setUserDropdownOpen}
//                 >
//                   <DropdownMenuTrigger asChild>
//                     <SidebarMenuButton className="h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
//                       <motion.div
//                         className={`flex items-center flex-1 min-w-0 overflow-hidden ${
//                           isCollapsed ? 'justify-center' : 'gap-3'
//                         }`}
//                         layout
//                         transition={{ duration: 0.3 }}
//                       >
//                         <motion.div
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
//                             <AvatarImage src={userAvatar} alt={userName} />
//                             <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-medium text-sm">
//                               {userName
//                                 .split(' ')
//                                 .map(n => n[0])
//                                 .join('')
//                                 .toUpperCase()}
//                             </AvatarFallback>
//                           </Avatar>
//                         </motion.div>
//                         <AnimatePresence>
//                           {!isCollapsed && (
//                             <motion.div
//                               className="flex-1 min-w-0 text-left overflow-hidden"
//                               initial={{ opacity: 0, width: 0 }}
//                               animate={{ opacity: 1, width: 'auto' }}
//                               exit={{ opacity: 0, width: 0 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <motion.p
//                                 className="font-medium text-sm text-slate-800 dark:text-slate-100 truncate"
//                                 initial={{ y: -5 }}
//                                 animate={{ y: 0 }}
//                                 transition={{ delay: 0.1 }}
//                               >
//                                 {userName}
//                               </motion.p>
//                               <motion.p
//                                 className="text-xs text-slate-600 dark:text-slate-400 truncate"
//                                 initial={{ y: 5 }}
//                                 animate={{ y: 0 }}
//                                 transition={{ delay: 0.15 }}
//                               >
//                                 {userEmail}
//                               </motion.p>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                         <AnimatePresence>
//                           {!isCollapsed && (
//                             <motion.div
//                               initial={{ opacity: 0, scale: 0 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               exit={{ opacity: 0, scale: 0 }}
//                             >
//                               <motion.div
//                                 animate={{ rotate: userDropdownOpen ? 180 : 0 }}
//                                 transition={{ duration: 0.3 }}
//                               >
//                                 <ChevronUp className="h-4 w-4 text-slate-500" />
//                               </motion.div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </motion.div>
//                     </SidebarMenuButton>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent
//                     side="top"
//                     align="start"
//                     className="w-max bg-[sidebar-background] backdrop-blur-md border-slate-200 -700 shadow-xl"
//                   >
//                     <DropdownMenuLabel className="font-normal">
//                       <div className="flex flex-col space-y-1">
//                         <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
//                           {userName}
//                         </p>
//                         <p className="text-xs text-slate-600 dark:text-slate-400">
//                           {userEmail}
//                         </p>
//                       </div>
//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
//                     <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors">
//                       <User2 className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300 transition-colors">
//                       <CreditCard className="mr-2 h-4 w-4" />
//                       <span>Billing</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 transition-colors">
//                       <Settings className="mr-2 h-4 w-4" />
//                       <span>Settings</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem className="cursor-pointer hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-300 transition-colors">
//                       <HelpCircle className="mr-2 h-4 w-4" />
//                       <span>Support</span>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
//                     <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors focus:text-red-600 dark:focus:text-red-400">
//                       <LogOut className="mr-2 h-4 w-4" />
//                       <span>Log out</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </motion.div>
//         </SidebarFooter>
//       </Sidebar>
//     </motion.div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
  Users,
  BarChart3,
  FileText,
  Heart,
  Bell,
  HelpCircle,
  LogOut,
  CreditCard,
  Shield,
  MapPin,
  Camera,
  Compass,
  Star,
  Navigation,
  Menu,
  X,
  Moon,
  Sun,
  Monitor,
  Palette,
  Check,
} from 'lucide-react';

// Theme definitions
const themes = [
  { name: 'light', label: 'Light', icon: Sun },
  { name: 'dark', label: 'Dark', icon: Moon },
  { name: 'system', label: 'System', icon: Monitor },
];

const colorThemes = [
  {
    name: 'blue',
    label: 'Ocean Blue',
    colors: {
      primary: 'from-blue-600 to-indigo-600',
      hover: 'hover:from-blue-700 hover:to-indigo-700',
      accent: 'bg-blue-50 text-blue-700',
      darkAccent: 'dark:bg-blue-900/20 dark:text-blue-300',
    },
  },
  {
    name: 'emerald',
    label: 'Forest Green',
    colors: {
      primary: 'from-emerald-600 to-green-600',
      hover: 'hover:from-emerald-700 hover:to-green-700',
      accent: 'bg-emerald-50 text-emerald-700',
      darkAccent: 'dark:bg-emerald-900/20 dark:text-emerald-300',
    },
  },
  {
    name: 'purple',
    label: 'Royal Purple',
    colors: {
      primary: 'from-purple-600 to-violet-600',
      hover: 'hover:from-purple-700 hover:to-violet-700',
      accent: 'bg-purple-50 text-purple-700',
      darkAccent: 'dark:bg-purple-900/20 dark:text-purple-300',
    },
  },
  {
    name: 'orange',
    label: 'Sunset Orange',
    colors: {
      primary: 'from-orange-600 to-red-600',
      hover: 'hover:from-orange-700 hover:to-red-700',
      accent: 'bg-orange-50 text-orange-700',
      darkAccent: 'dark:bg-orange-900/20 dark:text-orange-300',
    },
  },
  {
    name: 'rose',
    label: 'Cherry Blossom',
    colors: {
      primary: 'from-rose-600 to-pink-600',
      hover: 'hover:from-rose-700 hover:to-pink-700',
      accent: 'bg-rose-50 text-rose-700',
      darkAccent: 'dark:bg-rose-900/20 dark:text-rose-300',
    },
  },
];

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
    badge: null,
  },
  {
    title: 'Explore Destinations',
    url: '/explore',
    icon: Compass,
    badge: 'New',
  },
  {
    title: 'My Trips',
    url: '/trips',
    icon: Navigation,
    badge: '3',
  },
  {
    title: 'Favorites',
    url: '/favorites',
    icon: Heart,
    badge: null,
  },
  {
    title: 'Photo Gallery',
    url: '/gallery',
    icon: Camera,
    badge: null,
  },
];

// Tourist-specific features
const touristFeatures = [
  {
    title: 'Trip Planning',
    icon: Calendar,
    children: [
      { title: 'Create Trip', url: '/trips/create', icon: FileText },
      { title: 'My Itineraries', url: '/itineraries', icon: FileText },
      { title: 'Travel Calendar', url: '/calendar', icon: Calendar },
    ],
  },
  {
    title: 'Discoveries',
    icon: MapPin,
    children: [
      { title: 'Local Attractions', url: '/attractions', icon: Star },
      { title: 'Hidden Gems', url: '/gems', icon: Search },
      { title: 'Reviews & Ratings', url: '/reviews', icon: BarChart3 },
    ],
  },
  {
    title: 'Community',
    icon: Users,
    children: [
      { title: 'Travel Groups', url: '/groups', icon: Users },
      { title: 'Messages', url: '/messages', icon: Inbox },
      { title: 'Travel Feed', url: '/feed', icon: Bell },
    ],
  },
];

// Settings sections
const settingsItems = [
  {
    title: 'Account',
    children: [
      { title: 'Profile Settings', url: '/settings/profile', icon: User2 },
      { title: 'Privacy & Security', url: '/settings/privacy', icon: Shield },
      { title: 'Notifications', url: '/settings/notifications', icon: Bell },
    ],
  },
  {
    title: 'Preferences',
    children: [
      { title: 'Travel Preferences', url: '/settings/travel', icon: MapPin },
      { title: 'Language & Region', url: '/settings/language', icon: Settings },
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 },
};

const logoVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.6 },
  },
};

interface AppSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function AppSidebar({
  userName = 'John Traveler',
  userEmail = 'john.traveler@email.com',
  userAvatar = '',
}: AppSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(['trip-planning']);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('system');
  const [colorTheme, setColorTheme] = useState('blue');

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const savedColorTheme = localStorage.getItem('colorTheme') || 'blue';
    setTheme(savedTheme);
    setColorTheme(savedColorTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement;

    if (
      newTheme === 'dark' ||
      (newTheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const changeColorTheme = (newColorTheme: string) => {
    setColorTheme(newColorTheme);
    localStorage.setItem('colorTheme', newColorTheme);
  };

  const getCurrentColorTheme = () => {
    return colorThemes.find(ct => ct.name === colorTheme) || colorThemes[0];
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const currentColorTheme = getCurrentColorTheme();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className={`relative overflow-hidden bg-gradient-to-r ${currentColorTheme.colors.primary} ${currentColorTheme.colors.hover} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </Button>
          </motion.div>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-80 p-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-700"
        >
          <motion.div
            className="h-full flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <SheetHeader className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <motion.div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentColorTheme.colors.primary} text-white font-bold text-xl shadow-lg shadow-blue-500/25 cursor-pointer`}
                  variants={logoVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  T
                </motion.div>
                <div className="flex-1">
                  <SheetTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Tourist App
                  </SheetTitle>
                  <SheetDescription className="text-slate-600 dark:text-slate-400">
                    Explore the world with us
                  </SheetDescription>
                </div>
              </motion.div>

              {/* Theme Toggle - Positioned below header content */}
              <motion.div
                variants={itemVariants}
                className="flex justify-end pt-3"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Theme
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Theme Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Theme Mode */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Sun className="mr-2 h-4 w-4" />
                        Theme Mode
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {themes.map(themeOption => (
                          <DropdownMenuItem
                            key={themeOption.name}
                            onClick={() => changeTheme(themeOption.name)}
                            className="cursor-pointer"
                          >
                            <themeOption.icon className="mr-2 h-4 w-4" />
                            <span>{themeOption.label}</span>
                            {theme === themeOption.name && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Color Theme */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Palette className="mr-2 h-4 w-4" />
                        Color Theme
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {colorThemes.map(colorThemeOption => (
                          <DropdownMenuItem
                            key={colorThemeOption.name}
                            onClick={() =>
                              changeColorTheme(colorThemeOption.name)
                            }
                            className="cursor-pointer"
                          >
                            <div
                              className={`mr-2 h-4 w-4 rounded-full bg-gradient-to-r ${colorThemeOption.colors.primary}`}
                            />
                            <span>{colorThemeOption.label}</span>
                            {colorTheme === colorThemeOption.name && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </SheetHeader>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {/* Main Navigation */}
              <motion.div variants={itemVariants}>
                <h3 className="px-2 mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.a
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:${currentColorTheme.colors.accent} ${currentColorTheme.colors.darkAccent} transition-colors group`}
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          variants={iconVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <item.icon className="h-5 w-5 group-hover:text-current" />
                        </motion.div>
                        <span className="flex-1 font-medium">{item.title}</span>
                        <AnimatePresence>
                          {item.badge && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <Badge
                                variant={
                                  item.badge === 'New' ? 'default' : 'secondary'
                                }
                                className={`text-xs ${
                                  item.badge === 'New'
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {item.badge}
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              {/* Tourist Features */}
              <motion.div variants={itemVariants}>
                <h3 className="px-2 mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Features
                </h3>
                <div className="space-y-2">
                  {touristFeatures.map((feature, index) => {
                    const sectionId = feature.title
                      .toLowerCase()
                      .replace(' ', '-');
                    const isOpen = openSections.includes(sectionId);

                    return (
                      <motion.div
                        key={feature.title}
                        variants={itemVariants}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Collapsible
                          open={isOpen}
                          onOpenChange={() => toggleSection(sectionId)}
                        >
                          <CollapsibleTrigger asChild>
                            <motion.button
                              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300 transition-colors group"
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <motion.div
                                variants={iconVariants}
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <feature.icon className="h-5 w-5 group-hover:text-indigo-600" />
                              </motion.div>
                              <span className="flex-1 text-left font-medium">
                                {feature.title}
                              </span>
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-4 w-4 group-hover:text-indigo-600" />
                              </motion.div>
                            </motion.button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-1">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 space-y-1"
                            >
                              {feature.children.map((child, childIndex) => (
                                <motion.a
                                  key={child.title}
                                  href={child.url}
                                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: childIndex * 0.05 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.title}</span>
                                </motion.a>
                              ))}
                            </motion.div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              {/* Settings */}
              <motion.div variants={itemVariants}>
                <h3 className="px-2 mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Settings
                </h3>
                <div className="space-y-2">
                  <Collapsible
                    open={openSections.includes('settings')}
                    onOpenChange={() => toggleSection('settings')}
                  >
                    <CollapsibleTrigger asChild>
                      <motion.button
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 transition-colors group"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          variants={iconVariants}
                          whileHover={{ ...iconVariants.hover, rotate: 90 }}
                          whileTap="tap"
                        >
                          <Settings className="h-5 w-5 group-hover:text-purple-600" />
                        </motion.div>
                        <span className="flex-1 text-left font-medium">
                          Settings
                        </span>
                        <motion.div
                          animate={{
                            rotate: openSections.includes('settings') ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4 group-hover:text-purple-600" />
                        </motion.div>
                      </motion.button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 space-y-3"
                      >
                        {settingsItems.map(section => (
                          <div key={section.title} className="space-y-1">
                            <div className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                              {section.title}
                            </div>
                            {section.children.map((child, childIndex) => (
                              <motion.a
                                key={child.title}
                                href={child.url}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: childIndex * 0.05 }}
                                whileHover={{ x: 4 }}
                              >
                                <child.icon className="h-4 w-4" />
                                <span>{child.title}</span>
                              </motion.a>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>

                  <motion.a
                    href="/help"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-300 transition-colors group"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <HelpCircle className="h-5 w-5 group-hover:text-amber-600" />
                    </motion.div>
                    <span className="font-medium">Help & Support</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="border-t border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4"
            >
              <DropdownMenu
                open={userDropdownOpen}
                onOpenChange={setUserDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar
                        className={`h-10 w-10 ring-2 ring-opacity-20 shadow-lg`}
                        style={{ ringColor: currentColorTheme.colors.primary }}
                      >
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback
                          className={`bg-gradient-to-br ${currentColorTheme.colors.primary} text-white font-medium`}
                        >
                          {userName
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-100">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {userEmail}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: userDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </motion.div>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-slate-200 dark:border-slate-700 shadow-xl"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300">
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-300">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                  <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 focus:text-red-600 dark:focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
}