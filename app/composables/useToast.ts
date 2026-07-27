interface Toast {
  id: number
  message: string
}

export const useToast = () => {
  const toast = useState<Toast | null>('toast', () => null)

  const show = (message: string) => {
    const id = Date.now()
    toast.value = { id, message }
    setTimeout(() => {
      if (toast.value?.id === id) toast.value = null
    }, 2600)
  }

  return { toast, show }
}
