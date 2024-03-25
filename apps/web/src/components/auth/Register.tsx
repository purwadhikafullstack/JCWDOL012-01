// 'use client';

// import React from 'react';

// export default function Register() {
//   return (
//     <>
//       <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
//         <div
//           className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
//           style={{ width: 1000 }}
//         >
//           <div className="md:flex w-full">
//             <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
//               <svg
//                 id="a87032b8-5b37-4b7e-a4d9-4dbfbe394641"
//                 data-name="Layer 1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="100%"
//                 height="auto"
//                 viewBox="0 0 744.84799 747.07702"
//               ></svg>
//             </div>
//             <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
//               <div className="text-center mb-10">
//                 <h1 className="font-bold text-3xl text-gray-900">Sign Up</h1>
//                 <p>Enter your information to register</p>
//               </div>
//               <div>
//                 <div className="flex -mx-3">
//                   <div className="w-1/2 px-3 mb-5">
//                     <label className="text-xs font-semibold px-1">
//                       First name
//                     </label>
//                     <div className="flex">
//                       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                         <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
//                       </div>
//                       <input
//                         type="text"
//                         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
//                         placeholder="John"
//                       />
//                     </div>
//                   </div>
//                   <div className="w-1/2 px-3 mb-5">
//                     <label className="text-xs font-semibold px-1">
//                       Last name
//                     </label>
//                     <div className="flex">
//                       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                         <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
//                       </div>
//                       <input
//                         type="text"
//                         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
//                         placeholder="Smith"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex -mx-3">
//                   <div className="w-full px-3 mb-5">
//                     <label className="text-xs font-semibold px-1">Email</label>
//                     <div className="flex">
//                       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                         <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
//                       </div>
//                       <input
//                         type="email"
//                         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
//                         placeholder="johnsmith@example.com"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex -mx-3">
//                   <div className="w-full px-3 mb-12">
//                     <label className="text-xs font-semibold px-1">
//                       Password
//                     </label>
//                     <div className="flex">
//                       <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                         <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
//                       </div>
//                       <input
//                         type="password"
//                         className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
//                         placeholder="************"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex -mx-3">
//                   <div className="w-full px-3 mb-5">
//                     <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
//                       REGISTER NOW
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function Register() {
// return (
// <Dialog>
//   <DialogTrigger asChild>
//     <Button variant="outline">Sign Up</Button>
//   </DialogTrigger>
//   <DialogContent className="sm:max-w-[425px]">
//     <DialogHeader>
//       <DialogTitle>Sign up</DialogTitle>
//       <DialogDescription>
//         Make changes to your profile here. Click save when you're done.
//       </DialogDescription>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="name" className="text-right">
//           Name
//         </Label>
//         <Input
//           id="name"
//           defaultValue="Pedro Duarte"
//           className="col-span-3"
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="username" className="text-right">
//           Username
//         </Label>
//         <Input
//           id="username"
//           defaultValue="@peduarte"
//           className="col-span-3"
//         />
//       </div>
//     </div>
//     <DialogFooter>
//       <Button type="submit">Save changes</Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
// );
// }
