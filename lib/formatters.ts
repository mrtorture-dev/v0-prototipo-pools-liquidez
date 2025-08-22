export const formatCurrency = (
  value: number,
  options: {
    currency?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
) => {
  const { currency = "USD", minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}

export const formatNumber = (
  value: number,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    notation?: "standard" | "scientific" | "engineering" | "compact"
  } = {},
) => {
  const { minimumFractionDigits = 0, maximumFractionDigits = 2, notation = "standard" } = options

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(value)
}

export const formatPercentage = (value: number, decimals = 2) => {
  return `${value.toFixed(decimals)}%`
}

export const formatAddress = (address: string, chars = 4) => {
  if (!address) return ""
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export const formatTxHash = (hash: string, chars = 6) => {
  if (!hash) return ""
  return `${hash.slice(0, chars)}...${hash.slice(-4)}`
}

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions = {}) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return new Intl.DateTimeFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(date)
}

export const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return formatDate(date, { month: "short", day: "numeric", year: "numeric" })
}
