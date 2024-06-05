
const sendSms = async (phone, message) => {
    console.log(`⚡ ${message}`)
}

const sendPassword = async (phone, password) => {
    const message = `Your password: ${password}`;
    await sendSms(phone, message)
}

module.exports = { sendSms, sendPassword }
