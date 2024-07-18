import { Spinner } from "@/components/spinner"

const Loading = () => {
  return (
    <div className="px-8 py-4 flex transition-all duration-300 justify-center items-center gap-x-4 bg-neutral-100 dark:bg-neutral-900   rounded ">
      <Spinner size={"medium"} /> Loading ...
    </div>
  )
}

export default Loading
