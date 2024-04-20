const getDatetime = () => {
    // get current datetime in format 2024-01-29T05:00:00.000+00:00
    const date = new Date()
    return date.toISOString()
}

const displayDatetime = (postDatetime) => {
    //I have time in this format, I need to calculate like "minutes ago, hours ago, day ago, and if it more than 1 day, display whole thing.
    const parseDatetime = new Date(postDatetime)

    const currentDate = new Date()

    const diffTime = Math.abs(currentDate - parseDatetime)
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    if (diffDays < 1) {
        const diffHours = diffTime / (1000 * 60 * 60)
        // if minutes less than 1 minute, show now
        if (diffHours < 1 / 60) {
            return 'now'
        } else if (diffHours < 2) {
            const diffMinutes = diffTime / (1000 * 60)
            return `${Math.round(diffMinutes)} minutes ago`
        } else {
            return `${Math.round(diffHours)} hours ago`
        }
    } else {
        return parseDatetime.toDateString()
    }
}

export { getDatetime, displayDatetime }
