export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen px-4 py-4 md:px-6 lg:px-8 md:py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-[740px] lg:max-w-[960px] xl:max-w-[1100px]">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
