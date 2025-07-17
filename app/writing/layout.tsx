export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {/* This wrapper ensures consistent layout behavior */}
      <div className="relative">{children}</div>
    </div>
  );
}
