import SideNavbar from '@/components/SideNavbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-white text-black flex">
      {/* sidebar */}
      <SideNavbar />
      {/* main page */}
      <div className="p-8 w-full">main page</div>
    </div>
  );
}
