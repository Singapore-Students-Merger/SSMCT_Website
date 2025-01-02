export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
        {children}
      </div>
    );
  }