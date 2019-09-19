module.exports = {
  css: {
    sourceMap: true
  },

  runtimeCompiler: true,

  outputDir: process.env.VUE_APP_CLI_OUTPUTDIR,

  filenameHashing: process.env.VUE_APP_CLI_FILENAMEHASHING === 'true',
}
