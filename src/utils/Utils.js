import VideoSymbol from '../../assets/symbols/video_symbol.png'
import VideoSymbol1 from '../../assets/symbols/video_symbol_1.png'
import VideoSymbol2 from '../../assets/symbols/video_symbol_2.png'
import VideoSymbol3 from '../../assets/symbols/video_symbol_3.png'
import VideoSymbol4 from '../../assets/symbols/video_symbol_4.png'
import VideoSymbol5 from '../../assets/symbols/video_symbol_5.png'
import VideoSymbol6 from '../../assets/symbols/video_symbol_6.png'

import { validate } from 'email-validator'

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

const randomSymbol = (index) => {
    // const symbols = [
    //     VideoSymbol,
    //     VideoSymbol1,
    //     VideoSymbol2,
    //     VideoSymbol3,
    //     VideoSymbol4,
    // ]
    // return symbols[index]
    return VideoSymbol5
}

const nameValidator = (name) => {
    if (!name || name.length < 2) return false
    return true
}

const emailValidator = (email) => {
    if (!email || email.length <= 0 || !validate(email)) return false
    return true
}

const dobValidator = (dob) => {
    // only allow 18 years old and above
    const currentDate = new Date()
    const dobDate = new Date(dob)
    const diffTime = Math.abs(currentDate - dobDate)
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const diffYears = diffDays / 365

    if (diffYears < 18) {
        return false
    }

    return true
}

const passwordValidator = (password) => {
    if (!password || password.length < 8) return false
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!regex.test(password)) return false
    return true
}

export {
    getDatetime,
    displayDatetime,
    randomSymbol,
    nameValidator,
    emailValidator,
    dobValidator,
    passwordValidator,
}
