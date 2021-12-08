const { OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET)

const googleAuth = async (token) => {

  const googleClientId = '863174738597-ddgpkjo6dklvjj60sret1qi6rckc54b4.apps.googleusercontent.com';
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: googleClientId
  })
  const payload = ticket.getPayload()

  const { sub, email, name, picture } = payload;
  const userId = sub;
  return {userId, email, fullName: name, photoUrl: picture}

}

module.exports = googleAuth