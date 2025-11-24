import Navbar from "./Navbar";

export default function Layout({ children}) {
  return (
    <div className="min-h-screen min-w-screen max-w-full bg-gray-900 text-white">
      <Navbar />
    
      <div className={`px-6 py-4 flex items-center justify-center flex-col`} >
        {children}
      </div>
    </div>
  );
}
