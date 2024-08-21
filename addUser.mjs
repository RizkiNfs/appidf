import process from 'node:process'
import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'

const db = new Database('sqlite.db')

async function addUser() {
  try {
    const username = process.argv[2]
    const password = process.argv[3]
    if (!username || !password) {
      console.error('Usage: node addUser.mjs <username> <password>')
      process.exit(1)
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`).run(username, hashed)
  }
  catch (err) {
    console.error(err)
  }
}

addUser()
