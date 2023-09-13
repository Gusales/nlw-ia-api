import { app } from './app'

app
  .listen({
    port: 1313,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 Http server running')
  })
