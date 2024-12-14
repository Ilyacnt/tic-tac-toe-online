export function RootLayot({
  children,
  actions,
}: {
  children: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <>
      <div className='flex flex-row justify-end gap-2'>{actions}</div>
      <div className='grid grid-cols-2 gap-4'>{children}</div>
    </>
  )
}
