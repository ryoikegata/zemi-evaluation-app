import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { prisma } from '~/libs/dbconnect'
import { sessionStorage } from './session.server'

const SESSION_SECRET = process.env.SESSION_SECRET

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined')
}

const authenticator = new Authenticator<Omit<User, 'password'>>(sessionStorage)

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email')
  const password = form.get('password')

  console.log('email:', email)
  console.log('password:', password)
  if (!(email && password)) {
    throw new Error('Invalid Request')
  }

  const user = await prisma.user.findUnique({ where: { email: String(email) } })
  console.log('user:', user)

  if (!user) {
    throw new AuthorizationError()
  }

  const passwordsMatch = await bcrypt.compare(String(password), user.password)
  console.log('passwordsMatch:', passwordsMatch)

  if (!passwordsMatch) {
    throw new AuthorizationError()
  }

  const { password: _, ...userWithoutPassword } = user
  console.log('userWithoutPassword:',password, userWithoutPassword);

  return userWithoutPassword
})

authenticator.use(formStrategy, 'password')

export { authenticator }
