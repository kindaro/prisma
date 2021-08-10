import express from 'express'
import getopts from 'getopts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

/* Post */
app.use (express.json ({strict: false}))
app.get('/post', async function(_req, res, _next) {
	  res.status(200).send(await prisma.post.findMany ( ))
})
app.post('/post', async function(req, res, _next) {
    await prisma.post.create ({data: {content: req.body}})
	  res.status(200).send( )
})

const options = getopts(process.argv.slice(2), {
	alias: {
		port: 'p',
	},
	unknown: (option) => {
		console.log(`Unknown option: ${option}`)
		return false
	},
})

const port = options.port || 3000
app.listen(port, function() {
	console.log(`Listening on ${port}`)
})
