export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {children}
    </div>
  );
}
