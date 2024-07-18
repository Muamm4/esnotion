/* trunk-ignore-all(prettier) */
import {Loader} from "lucide-react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

const SpinnerLoader = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "w-5 h-5",
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface SpinnerProps extends VariantProps<typeof SpinnerLoader> {}

export const Spinner = ({size}: SpinnerProps) => {
  return <Loader className={cn(SpinnerLoader({size}))}></Loader>
}
export default Spinner