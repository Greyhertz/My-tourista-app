import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          // Base toast - NO background color here!
          toast:
            "group toast group-[.toaster]:text-white group-[.toaster]:border-2 group-[.toaster]:shadow-2xl group-[.toaster]:min-h-[100px] group-[.toaster]:p-6 group-[.toaster]:text-sm group-[.toaster]:rounded-xl group-[.toaster]:min-w-[400px]",
          
          description: "group-[.toast]:text-zinc-200 group-[.toast]:text-base group-[.toast]:mt-2",
          
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-zinc-900 group-[.toast]:hover:bg-zinc-100 group-[.toast]:font-semibold group-[.toast]:px-5 group-[.toast]:py-2.5 group-[.toast]:rounded-lg group-[.toast]:transition-colors",
          
          cancelButton:
            "group-[.toast]:bg-zinc-700 group-[.toast]:text-white group-[.toast]:hover:bg-zinc-600 group-[.toast]:font-medium group-[.toast]:px-5 group-[.toast]:py-2.5 group-[.toast]:rounded-lg group-[.toast]:transition-colors",
          
          // ✅ SUCCESS - Green
          success: "bg-green-500 border-green-500",
          
          // ❌ ERROR - Red
          error: "bg-red-500 border-red-500",
          
          // ⚠️ WARNING - Yellow
          warning: "bg-yellow-500 border-yellow-500",
          
          // ℹ️ INFO - Blue
          info: "bg-blue-500 border-blue-500",
          
          // 🔄 LOADING - Purple
          loading: "bg-purple-500 border-purple-500",
          
          // Default (when you use toast() without a type)
          default: "bg-zinc-900 border-zinc-700",
        },
      }}
      position="top-right"
      duration={4000}
      gap={12}
      {...props}
    />
  )
}

export { Toaster }