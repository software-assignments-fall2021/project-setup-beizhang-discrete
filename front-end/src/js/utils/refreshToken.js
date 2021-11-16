export const refreshToken = (res) => {
    let refreshRate = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000
    const refresh = async () => {
        const newAuth = await res.reloadAuthResponse()
        refreshRate = (newAuth.expires_in || 3600 - 5 * 60) * 1000
        setTimeout(refresh, refreshRate)
    }
    setTimeout(refresh, refreshRate)
}