interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="relative w-full max-w-[672px] mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="absolute -top-[168px] left-0 w-[336px] h-[336px] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-gray-200) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-gray-200) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, transparent 0%, white 100%)'
          }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
