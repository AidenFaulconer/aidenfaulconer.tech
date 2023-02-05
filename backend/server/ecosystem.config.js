module.exports = [
  {
    script: 'index.js',
    name: 'server',
    exec_mode: 'cluster',
    instances: 2,
    watch: true,
    ignore: ['./node_modules'],
  },
  //   {
  //     script: 'worker.js',
  //     name: 'worker',
  //   },
]
